import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ auditId: string }> }
) {
  try {
    const { auditId } = await params

    const session = req.cookies.get('hr_session')?.value
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const userEmail = JSON.parse(Buffer.from(session, 'base64').toString()).email

    const sql = neon(process.env.DATABASE_URL!)

    // Check Professional plan
    const subRows = await sql`
      SELECT plan FROM subscriptions
      WHERE user_email = ${userEmail}
      AND status = 'active'
      AND plan = 'professional'
      LIMIT 1
    `
    if (!subRows.length) {
      return NextResponse.json({ error: 'CSV export requires Professional plan' }, { status: 403 })
    }

    const rows = await sql`
      SELECT * FROM audits
      WHERE audit_id = ${auditId}
      AND user_email = ${userEmail}
      LIMIT 1
    `
    if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const audit = rows[0]
    const results = typeof audit.results === 'string'
      ? JSON.parse(audit.results)
      : audit.results

    // Build CSV
    const headers = ['ID', 'Category', 'Vulnerable', 'Severity', 'Reason', 'Citation', 'Prompt', 'Response', 'Engine']
    const csvRows = results.map((r: {
      id: string
      category: string
      vulnerable: boolean
      severity?: string
      reason: string
      citation?: string
      prompt: string
      response: string
      engine?: string
    }) => [
      r.id,
      r.category,
      r.vulnerable ? 'YES' : 'NO',
      r.severity ?? '',
      `"${(r.reason ?? '').replace(/"/g, '""')}"`,
      r.citation ?? '',
      `"${(r.prompt ?? '').replace(/"/g, '""').slice(0, 200)}"`,
      `"${(r.response ?? '').replace(/"/g, '""').slice(0, 200)}"`,
      r.engine ?? '',
    ].join(','))

    const csv = [headers.join(','), ...csvRows].join('\n')

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="vermelhoai-report-${auditId}.csv"`,
      },
    })
  } catch (err) {
    console.error('CSV export error:', err)
    return NextResponse.json({ error: 'CSV export failed.' }, { status: 500 })
  }
}
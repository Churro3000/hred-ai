import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ auditId: string }> }
) {
  try {
    const { auditId } = await params
    const session = req.cookies.get('hr_session')?.value
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    const { email } = JSON.parse(Buffer.from(session, 'base64').toString())
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`
      SELECT * FROM audits
      WHERE audit_id = ${auditId}
      AND user_email = ${email}
    `
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 })
    }
    const a = rows[0]
    return NextResponse.json({
      auditId: a.audit_id,
      timestamp: a.timestamp,
      endpointUrl: a.endpoint_url,
      riskScore: a.risk_score,
      riskLevel: a.risk_level,
      totalProbes: a.total_probes,
      vulnerabilitiesFound: a.vulnerabilities_found,
      results: a.results,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch audit.' }, { status: 500 })
  }
}

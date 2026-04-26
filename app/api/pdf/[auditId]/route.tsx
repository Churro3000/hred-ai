import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { renderToBuffer, Document } from '@react-pdf/renderer'
import { AuditPdfDocument } from '@/lib/pdfDocument'
import React from 'react'

export const runtime = 'nodejs'
export const maxDuration = 30

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
    const rows = await sql`
      SELECT * FROM audits WHERE audit_id = ${auditId} AND user_email = ${userEmail} LIMIT 1
    `
    if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const audit = rows[0]
    const results = typeof audit.results === 'string' ? JSON.parse(audit.results) : audit.results
    const vulnResults = results.filter((r: { vulnerable: boolean }) => r.vulnerable)
    const passCount = results.length - vulnResults.length
    const criticalCount = vulnResults.filter((r: { severity: string }) => r.severity === 'Critical').length
    const date = new Date(audit.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

    const element = React.createElement(AuditPdfDocument, {
      auditId,
      endpointUrl: audit.endpoint_url,
      riskScore: audit.risk_score,
      riskLevel: audit.risk_level,
      date,
      results,
      vulnResults,
      passCount,
      criticalCount,
    }) as React.ReactElement<React.ComponentProps<typeof Document>>

    const buffer = await renderToBuffer(element)

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="vermelhoai-report-${auditId}.pdf"`,
        'Content-Length': buffer.length.toString(),
      },
    })
  } catch (err) {
  const message = err instanceof Error ? err.message : String(err)
  console.error('PDF generation error:', message)
  return NextResponse.json({ error: message }, { status: 500 })
}
}
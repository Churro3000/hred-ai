import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

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
    const results: Array<{
      id: string
      category: string
      vulnerable: boolean
      severity?: string
      reason: string
      citation?: string
      prompt: string
      response: string
    }> = typeof audit.results === 'string' ? JSON.parse(audit.results) : audit.results

    const vulnResults = results.filter(r => r.vulnerable)
    const passCount = results.length - vulnResults.length
    const criticalCount = vulnResults.filter(r => r.severity === 'Critical').length
    const date = new Date(audit.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    const riskColor = audit.risk_score >= 70 ? [204, 26, 26] : audit.risk_score >= 40 ? [217, 119, 6] : [0, 166, 81]

    const jsPDFModule = await import('jspdf')
    const jsPDF = jsPDFModule.default
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    const W = 210
    const margin = 20
    const contentW = W - margin * 2
    let y = margin

    const addPage = () => {
      doc.addPage()
      y = margin
    }

    const checkY = (needed: number) => {
      if (y + needed > 280) addPage()
    }

    // Header bar
    doc.setFillColor(204, 26, 26)
    doc.rect(0, 0, W, 18, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('VermelhoAI', margin, 12)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text('AI Security Report', margin, 16.5)
    doc.setFontSize(8)
    doc.text(`ID: ${auditId}`, W - margin, 10, { align: 'right' })
    doc.text(date, W - margin, 15, { align: 'right' })
    y = 26

    // Endpoint
    doc.setTextColor(150, 150, 150)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.text('TESTED ENDPOINT', margin, y)
    y += 4
    doc.setTextColor(204, 26, 26)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text(audit.endpoint_url.slice(0, 80), margin, y)
    y += 8

    // Score box
    doc.setFillColor(245, 245, 240)
    doc.roundedRect(margin, y, 45, 28, 3, 3, 'F')
    doc.setTextColor(...(riskColor as [number, number, number]))
    doc.setFontSize(28)
    doc.setFont('helvetica', 'bold')
    doc.text(String(audit.risk_score), margin + 22.5, y + 16, { align: 'center' })
    doc.setFontSize(7)
    doc.text('/100', margin + 22.5, y + 21, { align: 'center' })
    doc.setFontSize(8)
    doc.text(audit.risk_level, margin + 22.5, y + 26, { align: 'center' })

    // Summary box
    doc.setFillColor(245, 245, 240)
    doc.roundedRect(margin + 50, y, contentW - 50, 28, 3, 3, 'F')
    doc.setTextColor(13, 13, 11)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Executive Summary', margin + 55, y + 7)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(90, 88, 82)
    const summaryText = `VermelhoAI ran ${results.length} adversarial probes. ${vulnResults.length > 0 ? `${vulnResults.length} vulnerabilities identified.` : 'No vulnerabilities detected.'}`
    doc.text(summaryText, margin + 55, y + 13, { maxWidth: contentW - 55 })

    // Stats
    const statLabels = ['Vulnerabilities', 'Probes Run', 'Passed', 'Critical']
    const statValues = [vulnResults.length, results.length, passCount, criticalCount]
    const statW = (contentW - 50) / 4
    statLabels.forEach((label, i) => {
      const sx = margin + 50 + i * statW
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(sx + 1, y + 17, statW - 2, 9, 2, 2, 'F')
      doc.setTextColor(204, 26, 26)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text(String(statValues[i]), sx + statW / 2, y + 23, { align: 'center' })
      doc.setTextColor(150, 150, 150)
      doc.setFontSize(5.5)
      doc.setFont('helvetica', 'normal')
      doc.text(label.toUpperCase(), sx + statW / 2, y + 26, { align: 'center' })
    })
    y += 36

    // Vulnerabilities section
    if (vulnResults.length > 0) {
      checkY(12)
      doc.setDrawColor(224, 222, 216)
      doc.setLineWidth(0.3)
      doc.line(margin, y, W - margin, y)
      y += 5
      doc.setTextColor(13, 13, 11)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(`Vulnerabilities Found (${vulnResults.length})`, margin, y)
      y += 6

      vulnResults.forEach(r => {
        checkY(24)
        doc.setFillColor(255, 248, 248)
        doc.setDrawColor(204, 26, 26)
        doc.setLineWidth(0.5)
        doc.roundedRect(margin, y, contentW, 20, 2, 2, 'FD')
        doc.setLineWidth(1.5)
        doc.line(margin, y, margin, y + 20)

        doc.setTextColor(204, 26, 26)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'bold')
        doc.text(r.category.toUpperCase(), margin + 4, y + 5)
        doc.text('VULNERABLE', margin + 50, y + 5)
        if (r.severity) doc.text(r.severity.toUpperCase(), margin + 75, y + 5)

        doc.setTextColor(90, 88, 82)
        doc.setFontSize(7.5)
        doc.setFont('helvetica', 'normal')
        const reasonLines = doc.splitTextToSize(r.reason, contentW - 8)
        doc.text(reasonLines.slice(0, 2), margin + 4, y + 10)

        if (r.citation) {
          doc.setTextColor(204, 26, 26)
          doc.setFontSize(6.5)
          doc.text(r.citation, margin + 4, y + 17)
        }
        y += 23
      })
    }

    // Remediation
    checkY(12)
    doc.setDrawColor(224, 222, 216)
    doc.setLineWidth(0.3)
    doc.line(margin, y, W - margin, y)
    y += 5
    doc.setTextColor(13, 13, 11)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('Remediation Recommendations', margin, y)
    y += 6

    const remItems = [
      { title: 'Harden your system prompt', body: 'Add explicit role-restriction instructions and test all persona injection variants.', ref: 'OWASP LLM01:2025' },
      { title: 'Implement output filtering', body: 'Deploy a detection layer that scans all outputs for sensitive data patterns.', ref: 'OWASP LLM02:2025' },
      { title: 'Suppress system verbosity', body: 'Return generic errors without system details or internal configuration.', ref: 'OWASP LLM07:2025' },
      { title: 'Add conversation monitoring', body: 'Detect escalating adversarial patterns across multi-turn conversations.', ref: 'OWASP LLM08:2025' },
      { title: 'Restrict tool access', body: 'Apply least-privilege principles to all tools and data sources your AI accesses.', ref: 'OWASP LLM06:2025' },
    ]

    remItems.forEach((item, i) => {
      checkY(14)
      doc.setFillColor(245, 245, 240)
      doc.roundedRect(margin, y, contentW, 12, 2, 2, 'F')
      doc.setTextColor(90, 88, 82)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'bold')
      doc.text(`${i + 1}`, margin + 4, y + 7)
      doc.setTextColor(13, 13, 11)
      doc.text(item.title, margin + 10, y + 5)
      doc.setTextColor(150, 150, 150)
      doc.setFontSize(6)
      doc.text(item.ref, margin + 10 + doc.getTextWidth(item.title) + 2, y + 5)
      doc.setTextColor(90, 88, 82)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7)
      doc.text(item.body, margin + 10, y + 9.5, { maxWidth: contentW - 14 })
      y += 15
    })

    // All probes
    checkY(12)
    doc.setDrawColor(224, 222, 216)
    doc.setLineWidth(0.3)
    doc.line(margin, y, W - margin, y)
    y += 5
    doc.setTextColor(13, 13, 11)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(`All Probe Results (${results.length})`, margin, y)
    y += 6

    results.forEach(r => {
      checkY(10)
      const cardColor = r.vulnerable ? [255, 242, 242] : [240, 253, 244]
      const borderColor = r.vulnerable ? [204, 26, 26] : [0, 166, 81]
      doc.setFillColor(...(cardColor as [number, number, number]))
      doc.setDrawColor(...(borderColor as [number, number, number]))
      doc.setLineWidth(0.3)
      doc.roundedRect(margin, y, contentW, 8, 1, 1, 'FD')
      doc.setLineWidth(1.2)
      doc.line(margin, y, margin, y + 8)

      doc.setTextColor(r.vulnerable ? 204 : 0, r.vulnerable ? 26 : 166, r.vulnerable ? 26 : 81)
      doc.setFontSize(6.5)
      doc.setFont('helvetica', 'bold')
      doc.text(r.category, margin + 3, y + 4)
      doc.text(r.vulnerable ? 'VULNERABLE' : 'PASSED', margin + 50, y + 4)

      doc.setTextColor(90, 88, 82)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(6.5)
      const reasonText = doc.splitTextToSize(r.reason, contentW - 80)
      doc.text(reasonText[0] ?? '', margin + 75, y + 4)
      y += 10
    })

    // Footer on each page
    const totalPages = (doc as unknown as { internal: { getNumberOfPages: () => number } }).internal.getNumberOfPages()
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p)
      doc.setFillColor(245, 245, 240)
      doc.rect(0, 287, W, 10, 'F')
      doc.setTextColor(150, 150, 150)
      doc.setFontSize(6)
      doc.setFont('helvetica', 'normal')
      doc.text('VermelhoAI · AI Security Report · Powered by Groq', margin, 293)
      doc.text(`Page ${p} of ${totalPages}`, W - margin, 293, { align: 'right' })
    }

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'))

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="vermelhoai-report-${auditId}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('PDF generation error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    padding: 48,
    fontSize: 10,
    color: '#2A2820',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#CC1A1A',
  },
  logoText: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: '#0D0D0B' },
  logoRed: { color: '#CC1A1A' },
  logoSub: { fontSize: 9, color: '#9A9890', marginTop: 2 },
  headerRight: { alignItems: 'flex-end' },
  headerLabel: { fontSize: 8, color: '#9A9890', textTransform: 'uppercase', letterSpacing: 1 },
  headerValue: { fontSize: 10, color: '#2A2820', fontFamily: 'Helvetica-Bold', marginTop: 2 },
  scoreSection: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  scoreBox: { width: 110, backgroundColor: '#F5F5F0', borderRadius: 8, padding: 16, alignItems: 'center', justifyContent: 'center' },
  scoreNumber: { fontSize: 40, fontFamily: 'Helvetica-Bold' },
  scoreLabel: { fontSize: 8, color: '#9A9890', marginTop: 4, textTransform: 'uppercase' },
  riskLevel: { fontSize: 12, fontFamily: 'Helvetica-Bold', marginTop: 6 },
  summaryBox: { flex: 1, backgroundColor: '#F5F5F0', borderRadius: 8, padding: 16 },
  summaryTitle: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: '#0D0D0B', marginBottom: 8 },
  summaryText: { fontSize: 9, color: '#5A5852', lineHeight: 1.6 },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  statBox: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 6, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#E0DED8' },
  statNum: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#CC1A1A' },
  statNumGreen: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#00A651' },
  statNumGray: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#2A2820' },
  statLabel: { fontSize: 7, color: '#9A9890', marginTop: 2, textTransform: 'uppercase' },
  sectionTitle: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: '#0D0D0B', marginBottom: 10, marginTop: 20, paddingBottom: 6, borderBottomWidth: 1, borderBottomColor: '#E0DED8' },
  findingCard: { marginBottom: 8, borderRadius: 6, borderWidth: 1, borderColor: '#E0DED8', padding: 12, backgroundColor: '#FFFFFF' },
  findingCardVuln: { borderLeftWidth: 4, borderLeftColor: '#CC1A1A' },
  findingCardPass: { borderLeftWidth: 4, borderLeftColor: '#00A651' },
  findingHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' },
  categoryBadge: { backgroundColor: '#FEF2F2', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#CC1A1A' },
  categoryBadgeGray: { backgroundColor: '#F0EFEA', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#5A5852' },
  vulnBadge: { backgroundColor: '#FEF2F2', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#CC1A1A' },
  passBadge: { backgroundColor: '#F0FDF4', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#00A651' },
  severityBadgeCritical: { backgroundColor: '#FEF2F2', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#CC1A1A' },
  severityBadgeHigh: { backgroundColor: '#FFF7ED', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#C2410C' },
  severityBadgeMedium: { backgroundColor: '#FEFCE8', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#A16207' },
  findingReason: { fontSize: 9, color: '#5A5852', lineHeight: 1.5, marginBottom: 4 },
  findingCitation: { fontSize: 8, color: '#CC1A1A', fontFamily: 'Helvetica-Bold' },
  probeBlock: { backgroundColor: '#F5F5F0', borderRadius: 4, padding: 8, marginTop: 6 },
  probeLabel: { fontSize: 7, color: '#9A9890', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', marginBottom: 3 },
  probeText: { fontSize: 8, color: '#5A5852', lineHeight: 1.4 },
  remItem: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  remNum: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#F5F5F0', borderWidth: 1, borderColor: '#E0DED8', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#5A5852' },
  remTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#0D0D0B', marginBottom: 2 },
  remBody: { fontSize: 8, color: '#5A5852', lineHeight: 1.5 },
  remRef: { fontSize: 7, color: '#9A9890', marginTop: 1 },
  footer: { position: 'absolute', bottom: 24, left: 48, right: 48, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#E0DED8', paddingTop: 8 },
  footerText: { fontSize: 7, color: '#9A9890' },
})

function getSeverityStyle(severity: string) {
  if (severity === 'Critical') return styles.severityBadgeCritical
  if (severity === 'High') return styles.severityBadgeHigh
  if (severity === 'Medium') return styles.severityBadgeMedium
  return styles.categoryBadgeGray
}

function getRiskColor(score: number) {
  if (score >= 70) return '#CC1A1A'
  if (score >= 40) return '#D97706'
  return '#00A651'
}

interface Result {
  id: string
  category: string
  vulnerable: boolean
  severity?: string
  reason: string
  citation?: string
  prompt: string
  response: string
  engine?: string
}

interface PdfDocumentProps {
  auditId: string
  endpointUrl: string
  riskScore: number
  riskLevel: string
  date: string
  results: Result[]
  vulnResults: Result[]
  passCount: number
  criticalCount: number
}

export function AuditPdfDocument({
  auditId,
  endpointUrl,
  riskScore,
  riskLevel,
  date,
  results,
  vulnResults,
  passCount,
  criticalCount,
}: PdfDocumentProps) {
  const riskColor = getRiskColor(riskScore)

  return (
    <Document title={`VermelhoAI Security Report — ${auditId}`} author="VermelhoAI">
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logoText}>Vermelho<Text style={styles.logoRed}>AI</Text></Text>
            <Text style={styles.logoSub}>AI Security Report</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerLabel}>Report ID</Text>
            <Text style={styles.headerValue}>{auditId}</Text>
            <Text style={[styles.headerLabel, { marginTop: 6 }]}>Date</Text>
            <Text style={styles.headerValue}>{date}</Text>
          </View>
        </View>

        {/* Endpoint */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.headerLabel}>Tested endpoint</Text>
          <Text style={[styles.headerValue, { fontSize: 9, color: '#CC1A1A', marginTop: 2 }]}>
            {endpointUrl}
          </Text>
        </View>

        {/* Score + Summary */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreBox}>
            <Text style={[styles.scoreNumber, { color: riskColor }]}>{riskScore}</Text>
            <Text style={styles.scoreLabel}>Risk Score</Text>
            <Text style={[styles.riskLevel, { color: riskColor }]}>{riskLevel}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Executive Summary</Text>
            <Text style={styles.summaryText}>
              VermelhoAI ran {results.length} adversarial probes across 10 attack categories.{' '}
              {vulnResults.length > 0
                ? `${vulnResults.length} potential ${vulnResults.length === 1 ? 'vulnerability was' : 'vulnerabilities were'} identified.`
                : 'No vulnerabilities were detected.'
              }
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={[styles.statNum, { color: vulnResults.length > 0 ? '#CC1A1A' : '#00A651' }]}>
                  {vulnResults.length}
                </Text>
                <Text style={styles.statLabel}>Vulnerabilities</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumGray}>{results.length}</Text>
                <Text style={styles.statLabel}>Probes run</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumGreen}>{passCount}</Text>
                <Text style={styles.statLabel}>Passed</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={[styles.statNum, { color: criticalCount > 0 ? '#CC1A1A' : '#00A651' }]}>
                  {criticalCount}
                </Text>
                <Text style={styles.statLabel}>Critical</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Vulnerabilities */}
        {vulnResults.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Vulnerabilities Found ({vulnResults.length})</Text>
            {vulnResults.map((r) => (
              <View key={r.id} style={[styles.findingCard, styles.findingCardVuln]} wrap={false}>
                <View style={styles.findingHeader}>
                  <Text style={styles.categoryBadge}>{r.category}</Text>
                  <Text style={styles.vulnBadge}>VULNERABLE</Text>
                  {r.severity && <Text style={getSeverityStyle(r.severity)}>{r.severity}</Text>}
                </View>
                <Text style={styles.findingReason}>{r.reason}</Text>
                {r.citation && <Text style={styles.findingCitation}>{r.citation}</Text>}
                <View style={styles.probeBlock}>
                  <Text style={styles.probeLabel}>Attack prompt</Text>
                  <Text style={styles.probeText}>{r.prompt.slice(0, 300)}</Text>
                </View>
                <View style={[styles.probeBlock, { marginTop: 4 }]}>
                  <Text style={styles.probeLabel}>Model response</Text>
                  <Text style={styles.probeText}>{r.response.slice(0, 300)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Remediation */}
        <Text style={styles.sectionTitle}>Remediation Recommendations</Text>
        {[
          { title: 'Harden your system prompt', body: 'Add explicit role-restriction instructions and test all persona injection variants.', ref: 'OWASP LLM01:2025' },
          { title: 'Implement output filtering', body: 'Deploy a detection layer that scans all model outputs for sensitive data patterns.', ref: 'OWASP LLM02:2025' },
          { title: 'Suppress system verbosity', body: 'Return generic errors without system details, model version, or internal configuration.', ref: 'OWASP LLM07:2025' },
          { title: 'Add conversation-level monitoring', body: 'Implement monitoring to detect escalating adversarial patterns across conversations.', ref: 'OWASP LLM08:2025' },
          { title: 'Restrict plugin and tool access', body: 'Apply least-privilege principles to any tools or data sources your AI has access to.', ref: 'OWASP LLM06:2025' },
        ].map((item, i) => (
          <View key={item.title} style={styles.remItem} wrap={false}>
            <Text style={styles.remNum}>{i + 1}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.remTitle}>{item.title} <Text style={styles.remRef}>{item.ref}</Text></Text>
              <Text style={styles.remBody}>{item.body}</Text>
            </View>
          </View>
        ))}

        {/* All probes */}
        <Text style={styles.sectionTitle}>All Probe Results ({results.length})</Text>
        {results.map((r) => (
          <View key={r.id} style={[styles.findingCard, r.vulnerable ? styles.findingCardVuln : styles.findingCardPass]} wrap={false}>
            <View style={styles.findingHeader}>
              <Text style={r.vulnerable ? styles.categoryBadge : styles.categoryBadgeGray}>{r.category}</Text>
              <Text style={r.vulnerable ? styles.vulnBadge : styles.passBadge}>
                {r.vulnerable ? 'VULNERABLE' : 'PASSED'}
              </Text>
              {r.severity && r.vulnerable && <Text style={getSeverityStyle(r.severity)}>{r.severity}</Text>}
            </View>
            <Text style={styles.findingReason}>{r.reason}</Text>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>VermelhoAI · AI Security Report · {auditId}</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>

      </Page>
    </Document>
  )
}
import * as React from 'react'

interface AuditCompleteEmailProps {
  userName: string
  auditId: string
  riskScore: number
  riskLevel: string
  totalProbes: number
  vulnerabilitiesFound: number
  endpointUrl: string
  appUrl: string
}

export function AuditCompleteEmail({
  userName,
  auditId,
  riskScore,
  riskLevel,
  totalProbes,
  vulnerabilitiesFound,
  endpointUrl,
  appUrl,
}: AuditCompleteEmailProps) {
  const riskColor = riskScore >= 70 ? '#CC1A1A' : riskScore >= 40 ? '#D97706' : '#00A651'
  const passCount = totalProbes - vulnerabilitiesFound

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your VermelhoAI Security Report is Ready</title>
      </head>
      <body style={{ backgroundColor: '#F5F5F0', fontFamily: "'Space Grotesk', Helvetica, Arial, sans-serif", margin: 0, padding: 0 }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>

          {/* Header */}
          <div style={{ backgroundColor: '#0D0D0B', borderRadius: '12px 12px 0 0', padding: '32px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#CC1A1A', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontSize: '16px' }}>V</span>
              </div>
              <span style={{ color: 'white', fontSize: '20px', fontWeight: '900' }}>
                Vermelho<span style={{ color: '#CC1A1A' }}>AI</span>
              </span>
            </div>
            <p style={{ color: '#9A9890', fontSize: '13px', margin: '0' }}>
              AI Security Report Ready
            </p>
          </div>

          {/* Body */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0D0D0B', margin: '0 0 8px 0' }}>
              Your audit is complete, {userName.split('@')[0]}.
            </h1>
            <p style={{ color: '#5A5852', fontSize: '14px', margin: '0 0 24px 0' }}>
              VermelhoAI has finished running adversarial probes against your AI endpoint. Here's your summary:
            </p>

            {/* Score box */}
            <div style={{ backgroundColor: '#F5F5F0', borderRadius: '12px', padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '64px', fontWeight: '900', color: riskColor, lineHeight: '1', marginBottom: '4px' }}>
                {riskScore}
              </div>
              <div style={{ color: '#9A9890', fontSize: '12px', marginBottom: '8px' }}>/100 risk score</div>
              <div style={{ display: 'inline-block', backgroundColor: riskScore >= 70 ? '#FEF2F2' : riskScore >= 40 ? '#FFFBEB' : '#F0FDF4', color: riskColor, borderRadius: '100px', padding: '4px 16px', fontSize: '13px', fontWeight: '700' }}>
                {riskLevel}
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              {[
                { label: 'Probes run', value: String(totalProbes), color: '#0D0D0B' },
                { label: 'Vulnerabilities', value: String(vulnerabilitiesFound), color: vulnerabilitiesFound > 0 ? '#CC1A1A' : '#00A651' },
                { label: 'Passed', value: String(passCount), color: '#00A651' },
              ].map(stat => (
                <div key={stat.label} style={{ backgroundColor: '#F5F5F0', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '900', color: stat.color, lineHeight: '1' }}>
                    {stat.value}
                  </div>
                  <div style={{ color: '#9A9890', fontSize: '11px', marginTop: '4px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Endpoint */}
            <div style={{ backgroundColor: '#F5F5F0', borderRadius: '8px', padding: '12px 16px', marginBottom: '24px' }}>
              <p style={{ color: '#9A9890', fontSize: '11px', fontWeight: '700', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                Tested endpoint
              </p>
              <p style={{ color: '#CC1A1A', fontSize: '12px', margin: '0', wordBreak: 'break-all' }}>
                {endpointUrl}
              </p>
            </div>

            {/* CTA */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <a href={`${appUrl}/dashboard/report/${auditId}`} style={{ display: 'inline-block', backgroundColor: '#CC1A1A', color: 'white', padding: '14px 32px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>
                View Full Report
              </a>
            </div>

            {/* Download PDF note */}
            <p style={{ color: '#9A9890', fontSize: '12px', textAlign: 'center', margin: '0' }}>
              You can also download a PDF version of your report from the report page.
            </p>
          </div>

          {/* Footer */}
          <div style={{ backgroundColor: '#F0EFEA', borderRadius: '0 0 12px 12px', padding: '20px 32px', textAlign: 'center' }}>
            <p style={{ color: '#9A9890', fontSize: '11px', margin: '0 0 4px 0' }}>
              VermelhoAI · AI Red Teaming Platform
            </p>
            <p style={{ color: '#9A9890', fontSize: '11px', margin: '0' }}>
              Audit ID: {auditId} · vermelho = red in Portuguese
            </p>
          </div>

        </div>
      </body>
    </html>
  )
}
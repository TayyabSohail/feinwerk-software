/** Escapes user-supplied text before it goes into the HTML email body. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface EnquiryEmailInput {
  name: string;
  email: string;
  company?: string;
  /** Human-readable label, not the raw slug. */
  service: string;
  /** Human-readable label, not the raw slug. */
  budget: string;
  message: string;
}

/**
 * Plain, table-based HTML so it renders the same in Gmail, Outlook and
 * anything else. No external assets, no webfonts.
 */
export function renderEnquiryHtml({
  name,
  email,
  company,
  service,
  budget,
  message,
}: EnquiryEmailInput) {
  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ['Company', company || '—'],
    ['Service', service],
    ['Budget', budget],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 16px 8px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:500;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('');

  const messageHtml = escapeHtml(message).replace(/\n/g, '<br />');

  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f5f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e7e5e4;">
      <tr>
        <td style="padding:24px 28px;border-bottom:1px solid #e7e5e4;">
          <p style="margin:0;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#6b7280;">Feinwerks Software</p>
          <h1 style="margin:8px 0 0;font-size:20px;color:#111827;">New enquiry from the website</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">${rowsHtml}</table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 28px 28px;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#6b7280;">Message</p>
          <div style="padding:16px;background:#fafaf9;border:1px solid #e7e5e4;color:#111827;font-size:14px;line-height:1.65;">${messageHtml}</div>
          <p style="margin:20px 0 0;font-size:13px;color:#6b7280;">Reply directly to this email to answer ${escapeHtml(name)}.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

interface AcknowledgementInput {
  name: string;
  service: string;
  message: string;
  responseTime: string;
}

/**
 * The copy of the enquiry that goes back to the visitor, so they have proof
 * the form worked and a record of what they sent.
 */
export function renderAcknowledgementHtml({
  name,
  service,
  message,
  responseTime,
}: AcknowledgementInput) {
  const firstName = name.split(' ')[0] || name;
  const messageHtml = escapeHtml(message).replace(/\n/g, '<br />');

  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f5f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e7e5e4;">
      <tr>
        <td style="padding:24px 28px;border-bottom:1px solid #e7e5e4;">
          <p style="margin:0;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#6b7280;">Feinwerks Software</p>
          <h1 style="margin:8px 0 0;font-size:20px;color:#111827;">We have your message, ${escapeHtml(firstName)}</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <p style="margin:0 0 16px;font-size:14px;line-height:1.65;color:#111827;">
            Thanks for getting in touch about <strong>${escapeHtml(service)}</strong>.
            A real person reads every enquiry and you will hear back ${escapeHtml(responseTime)}.
          </p>
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#6b7280;">What you sent</p>
          <div style="padding:16px;background:#fafaf9;border:1px solid #e7e5e4;color:#111827;font-size:14px;line-height:1.65;">${messageHtml}</div>
          <p style="margin:20px 0 0;font-size:13px;color:#6b7280;">Reply to this email if you want to add anything.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// ==============================================================================
// SnapBot Professional Transactional Email Service (Resend)
// Compliant with Gmail One-Time Code Quick Action parsing & Zero-Neon Minimalist Design
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { Resend } from 'resend';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[Resend Warn]: RESEND_API_KEY environment variable is not configured.');
    return null;
  }
  return new Resend(apiKey);
}

export const DEFAULT_EMAIL_FROM = process.env.EMAIL_FROM || 'SnapBot <admin@koharu.live>';

/**
 * 1. Send 6-Digit Security Code (OTP) Email with Gmail Quick Action support
 */
export async function sendOtpVerificationEmail(toEmail: string, otpCode: string, nickname: string) {
  const resend = getResendClient();
  if (!resend) {
    console.warn(`[Resend Simulated]: Security Code ${otpCode} for ${toEmail}`);
    return { success: false, error: 'NO_API_KEY' };
  }

  // Format code with spaces for instant recognition: e.g. "4 2 6 0 9 8"
  const spacedCode = otpCode.split('').join(' ');

  const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your SnapBot security code: ${otpCode}</title>
  <!-- Schema.org Microdata for Gmail One-Time Password Quick Actions -->
  <script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "EmailMessage",
    "description": "SnapBot 보안 코드"
  }
  </script>
</head>
<body style="margin: 0; padding: 0; background-color: #0F172A; font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0F172A; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 540px; background-color: #1E293B; border: 1px solid #334155; border-radius: 16px; overflow: hidden;">
          <!-- Top Clean Brand Header -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #334155;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="width: 36px; height: 36px; vertical-align: middle;">
                    <img src="https://snapbot.koharu.live/icon.png" width="36" height="36" alt="SnapBot" style="display: block; border-radius: 8px; border: 1px solid #475569;" />
                  </td>
                  <td style="padding-left: 12px; font-size: 18px; font-weight: 700; color: #FFFFFF; vertical-align: middle;">
                    SnapBot
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              <h1 style="color: #FFFFFF; font-size: 20px; font-weight: 700; margin: 0 0 16px 0; line-height: 1.4;">
                이메일 보안 코드 인증
              </h1>

              <p style="color: #94A3B8; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
                안녕하세요, <strong style="color: #F8FAFC;">${nickname}</strong>님.<br>
                귀하의 SnapBot 계정에 대한 다음 작업 (회원가입 / 로그인 인증) 을 확인해 달라는 요청을 받았습니다. 다음 코드를 사용하십시오.
              </p>

              <!-- OTP Code Display Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
                <tr>
                  <td align="center" style="background-color: #0F172A; border: 1px solid #475569; border-radius: 12px; padding: 24px 16px;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #94A3B8; margin-bottom: 8px; font-weight: 600;">
                      보안 코드
                    </div>
                    <div style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #FFFFFF; font-family: 'Courier New', monospace;">
                      ${spacedCode}
                    </div>
                  </td>
                </tr>
              </table>

              <p style="color: #64748B; font-size: 13px; line-height: 1.6; margin: 0 0 24px 0;">
                이 코드는 <strong>10분 후에 만료</strong>됩니다. 요청하지 않으셨다면 이 이메일을 무시하셔도 됩니다.
              </p>

              <hr style="border: 0; border-top: 1px solid #334155; margin: 24px 0;">

              <p style="color: #64748B; font-size: 12px; line-height: 1.5; margin: 0;">
                &copy; 2026 SnapBot (Workshop-Koharu). All rights reserved.<br>
                공식 웹사이트: <a href="https://snapbot.koharu.live" style="color: #818CF8; text-decoration: none;">https://snapbot.koharu.live</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const result = await resend.emails.send({
      from: DEFAULT_EMAIL_FROM,
      to: [toEmail],
      // Subject format exactly recognized by Gmail OTP card parser
      subject: `Your SnapBot security code: ${otpCode} (SnapBot 보안 코드: ${otpCode})`,
      html: htmlContent,
    });
    console.log(`[Resend OTP Sent] to: ${toEmail}, id: ${result.data?.id}`);
    return { success: true, data: result.data };
  } catch (error) {
    console.error('[Resend OTP Error]:', error);
    return { success: false, error };
  }
}

/**
 * 2. Send Welcome Email Upon Successful Verification (Zero Neon, Official Logo, Real Nickname)
 */
export async function sendWelcomeEmail(toEmail: string, nickname: string) {
  const resend = getResendClient();
  if (!resend) {
    console.warn(`[Resend Simulated]: Welcome email for ${toEmail}`);
    return { success: false, error: 'NO_API_KEY' };
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SnapBot 가입 환영 안내</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0F172A; font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0F172A; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #1E293B; border: 1px solid #334155; border-radius: 16px; overflow: hidden;">
          <!-- Brand Header -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #334155;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="width: 36px; height: 36px; vertical-align: middle;">
                    <img src="https://snapbot.koharu.live/icon.png" width="36" height="36" alt="SnapBot" style="display: block; border-radius: 8px; border: 1px solid #475569;" />
                  </td>
                  <td style="padding-left: 12px; font-size: 18px; font-weight: 700; color: #FFFFFF; vertical-align: middle;">
                    SnapBot
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Greeting -->
          <tr>
            <td style="padding: 32px;">
              <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 700; margin: 0 0 16px 0; line-height: 1.4;">
                회원가입이 완료되었습니다. 환영합니다, ${nickname}님!
              </h1>
              <p style="color: #94A3B8; font-size: 14px; line-height: 1.7; margin: 0 0 24px 0;">
                스크래치와 엔트리처럼 직관적인 블록 코딩으로 디스코드 봇을 손쉽게 제작할 수 있는 <strong>SnapBot</strong>에 오신 것을 진심으로 환영합니다.<br>
                지금 웹 스튜디오에 접속하여 나만의 디스코드 봇을 바로 조립해 보세요.
              </p>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
                <tr>
                  <td align="center">
                    <a href="https://snapbot.koharu.live/studio" style="display: inline-block; background-color: #4F46E5; color: #FFFFFF; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 10px;">
                      블록 코딩 스튜디오 시작하기 &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <hr style="border: 0; border-top: 1px solid #334155; margin: 28px 0;">

              <p style="color: #64748B; font-size: 12px; line-height: 1.5; margin: 0;">
                &copy; 2026 SnapBot (Workshop-Koharu). All rights reserved.<br>
                공식 웹사이트: <a href="https://snapbot.koharu.live" style="color: #818CF8; text-decoration: none;">https://snapbot.koharu.live</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const result = await resend.emails.send({
      from: DEFAULT_EMAIL_FROM,
      to: [toEmail],
      subject: `[SnapBot] 회원가입 완료! 환영합니다, ${nickname}님`,
      html: htmlContent,
    });
    console.log(`[Resend Welcome Sent] to: ${toEmail}, id: ${result.data?.id}`);
    return { success: true, data: result.data };
  } catch (error) {
    console.error('[Resend Welcome Error]:', error);
    return { success: false, error };
  }
}

// ==============================================================================
// SnapBot Resend Email Service & HTML Templates
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { Resend } from 'resend';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[Resend Warn]: RESEND_API_KEY 환경변수가 설정되지 않았습니다.');
    return null;
  }
  return new Resend(apiKey);
}

export const DEFAULT_EMAIL_FROM = process.env.EMAIL_FROM || 'SnapBot <admin@koharu.live>';

/**
 * 1. Send 6-Digit OTP Verification Email
 */
export async function sendOtpVerificationEmail(toEmail: string, otpCode: string, nickname: string) {
  const resend = getResendClient();
  if (!resend) {
    console.warn(`[Resend Simulated]: OTP ${otpCode} for ${toEmail} (API key not configured)`);
    return { success: false, error: 'NO_API_KEY' };
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SnapBot 이메일 인증번호 안내</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0B0F19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0B0F19; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #111827; border: 1px solid #1F2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
          <tr>
            <td style="background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%); height: 6px;"></td>
          </tr>
          <tr>
            <td style="padding: 36px 32px; text-align: left;">
              <!-- Brand Header -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); width: 40px; height: 40px; border-radius: 10px; text-align: center; vertical-align: middle;">
                    <span style="font-size: 20px; font-weight: 900; color: #FFFFFF; font-family: monospace;">X</span>
                  </td>
                  <td style="padding-left: 12px; font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px;">
                    SnapBot
                  </td>
                </tr>
              </table>

              <!-- Main Title -->
              <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 700; margin: 0 0 12px 0; line-height: 1.4;">
                이메일 주소 인증을 완료해 주세요
              </h1>
              <p style="color: #9CA3AF; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
                안녕하세요, <strong style="color: #F3F4F6;">${nickname}</strong>님.<br>
                비주얼 블록 코딩 디스코드 봇 플랫폼 <strong>SnapBot</strong>에 오신 것을 환영합니다.
                회원가입 승인을 위해 아래의 6자리 인증번호를 화면에 입력해 주세요.
              </p>

              <!-- 6-Digit OTP Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
                <tr>
                  <td align="center" style="background-color: #1F2937; border: 1px solid #374151; border-radius: 12px; padding: 24px 16px;">
                    <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #818CF8; margin-bottom: 8px; font-weight: 600;">
                      Verification Code
                    </span>
                    <span style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #FFFFFF; font-family: 'Courier New', monospace;">
                      ${otpCode}
                    </span>
                  </td>
                </tr>
              </table>

              <p style="color: #6B7280; font-size: 12px; line-height: 1.6; margin: 0 0 24px 0; border-left: 2px solid #4F46E5; padding-left: 12px;">
                이 인증번호는 <strong>10분 동안만 유효</strong>합니다.<br>
                본인이 요청하지 않은 경우 이 메일을 안전하게 무시하셔도 됩니다.
              </p>

              <hr style="border: 0; border-top: 1px solid #1F2937; margin: 24px 0;">

              <p style="color: #4B5563; font-size: 11px; line-height: 1.5; margin: 0;">
                &copy; 2026 SnapBot (Workshop-Koharu). All rights reserved.<br>
                공식 도메인: <a href="https://snapbot.koharu.live" style="color: #6366F1; text-decoration: none;">https://snapbot.koharu.live</a>
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
      subject: `[SnapBot] 회원가입 인증번호 안내 [${otpCode}]`,
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
 * 2. Send Welcome Email Upon Successful Registration or Google Login
 */
export async function sendWelcomeEmail(toEmail: string, nickname: string) {
  const resend = getResendClient();
  if (!resend) {
    console.warn(`[Resend Simulated]: Welcome email for ${toEmail} (API key not configured)`);
    return { success: false, error: 'NO_API_KEY' };
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SnapBot 회원가입 완료 및 환영 안내</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0B0F19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0B0F19; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #111827; border: 1px solid #1F2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #6366F1 50%, #8B5CF6 100%); height: 6px;"></td>
          </tr>
          <tr>
            <td style="padding: 40px 32px; text-align: left;">
              <!-- Brand Header -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); width: 44px; height: 44px; border-radius: 12px; text-align: center; vertical-align: middle;">
                    <span style="font-size: 22px; font-weight: 900; color: #FFFFFF; font-family: monospace;">X</span>
                  </td>
                  <td style="padding-left: 12px; font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px;">
                    SnapBot (스냅봇)
                  </td>
                </tr>
              </table>

              <!-- Main Greeting -->
              <h1 style="color: #FFFFFF; font-size: 24px; font-weight: 800; margin: 0 0 16px 0; line-height: 1.3;">
                회원가입이 완료되었습니다. 환영합니다, ${nickname}님!
              </h1>
              <p style="color: #9CA3AF; font-size: 14px; line-height: 1.7; margin: 0 0 24px 0;">
                스크래치와 엔트리처럼 블록을 조립하여 나만의 강력한 디스코드 봇을 무료로 만들어 보세요.<br>
                지금 바로 웹 스튜디오에 접속하여 첫 번째 봇을 제작할 수 있습니다.
              </p>

              <!-- Feature Highlights Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #1F2937; border: 1px solid #374151; border-radius: 12px; padding: 20px; margin: 0 0 28px 0;">
                <tr>
                  <td>
                    <ul style="margin: 0; padding-left: 20px; color: #D1D5DB; font-size: 13px; line-height: 1.8;">
                      <li><strong>순수 TypeScript 블록 엔진:</strong> 부드러운 자석 스냅과 200+ 표준 블록</li>
                      <li><strong>discord.js v14 실시간 코드 생성:</strong> 최신 표준 규격 소스코드 원클릭 다운로드</li>
                      <li><strong>브라우저 내장 봇 시뮬레이터:</strong> 토큰 없이도 브라우저에서 즉시 동작 테스트</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- Call to Action Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 32px 0 24px 0;">
                <tr>
                  <td align="center">
                    <a href="https://snapbot.koharu.live/studio" style="display: inline-block; background: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%); color: #FFFFFF; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 36px; border-radius: 12px; box-shadow: 0 4px 14px 0 rgba(79, 70, 229, 0.4);">
                      스튜디오에서 첫 봇 만들기 &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <hr style="border: 0; border-top: 1px solid #1F2937; margin: 28px 0;">

              <p style="color: #4B5563; font-size: 11px; line-height: 1.5; margin: 0;">
                본 메일은 SnapBot 서비스 이용을 위해 발송되었습니다.<br>
                GitHub 저장소: <a href="https://github.com/Workshop-Koharu/SnapBot" style="color: #6366F1; text-decoration: none;">Workshop-Koharu/SnapBot</a>
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

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PasswordResetRequest {
  email: string;
  resetLink: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, resetLink }: PasswordResetRequest = await req.json();

    console.log(`Sending password reset email to: ${email}`);

    const emailResponse = await resend.emails.send({
      from: "ITGyani <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Your Password - ITGyani Admin",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background-color: white; border-radius: 8px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #18181b; margin: 0; font-size: 28px; font-weight: 700;">Reset Your Password</h1>
              </div>
              
              <div style="margin-bottom: 30px;">
                <p style="color: #3f3f46; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                  We received a request to reset your password for your ITGyani Admin account. Click the button below to create a new password:
                </p>
              </div>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="${resetLink}" 
                   style="display: inline-block; background-color: #3b82f6; color: white; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  Reset Password
                </a>
              </div>
              
              <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #e4e4e7;">
                <p style="color: #71717a; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0;">
                  If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
                </p>
                <p style="color: #71717a; font-size: 14px; line-height: 1.6; margin: 0;">
                  This link will expire in 1 hour for security reasons.
                </p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #e4e4e7; text-align: center;">
                <p style="color: #a1a1aa; font-size: 12px; margin: 0;">
                  © ${new Date().getFullYear()} ITGyani. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Password reset email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true,
      message: "Password reset email sent successfully" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-password-reset function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);


import { Resend } from 'resend';


export const sendEmail = async (
    first_name: string, 
    last_name: string, 
    email: string, 
    phone: string, 
    message: string,

    date: string, 
    time: string, 
    
    user_agent: string, 
    
    env: any
) => {

    const resend = new Resend(env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({

        from: env.RESEND_FROM_EMAIL,
        to: [email],
        subject: `New Contact Form Submission`,
        html: `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Contact Form Submission</title>
                    <!--[if mso]>
                    <style type="text/css">
                        table {border-collapse: collapse;}
                        .button {padding: 0 !important;}
                        .button a {padding: 12px 30px !important;}
                    </style>
                    <![endif]-->
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; color: #333333;">
                    <!-- Email Container -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                        <td align="center" style="padding: 20px 0;">
                            <!-- Email Content -->
                            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); overflow: hidden; max-width: 100%;">
                            <!-- Header -->
                            <tr>
                                <td style="background-color: #0f766e; padding: 20px 40px; text-align: center;">
                                    <span style="font-size: 30px; font-weight: 600; color: #ffffff;">Gigwork</span>
                                    <!-- <img src="https://via.placeholder.com/150x50" alt="Website Logo" style="max-width: 150px; height: auto;"> -->
                                </td>
                            </tr>
                            
                            <!-- Main Content -->
                            <tr>
                                <td style="padding: 40px;">
                                <h1 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #111827;">New Contact Form Submission</h1>
                                
                                <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #4b5563;">
                                    You have received a new message from your website's contact form. Here are the details:
                                </p>
                                
                                <!-- Contact Details -->
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0; background-color: #f8fafc; border-radius: 6px; padding: 25px; border-left: 4px solid #0f766e;">
                                    <tr>
                                    <td>
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                        <tr>
                                            <td width="130" style="padding: 10px 0; font-weight: 600; color: #334155;">Name:</td>
                                            <td style="padding: 10px 0; color: #111827; font-size: 16px;">${first_name} ${last_name}</td>
                                        </tr>
                                        <tr>
                                            <td width="130" style="padding: 10px 0; font-weight: 600; color: #334155;">Email:</td>
                                            <td style="padding: 10px 0; color: #111827; font-size: 16px;">
                                                <a href="mailto:${email}" style="color: #0f766e; text-decoration: none;">${email}</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="130" style="padding: 10px 0; font-weight: 600; color: #334155;">Phone:</td>
                                            <td style="padding: 10px 0; color: #111827; font-size: 16px;">
                                                <a href="tel:${phone}" style="color: #0f766e; text-decoration: none;">${phone}</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="130" style="padding: 10px 0; font-weight: 600; vertical-align: top; color: #334155;">Message:</td>
                                            <td style="padding: 10px 0; color: #111827; font-size: 16px; line-height: 1.6;">${message}</td>
                                        </tr>
                                        <tr>
                                            <td width="130" style="padding: 10px 0; font-weight: 600; color: #334155;">Date & Time:</td>
                                            <td style="padding: 10px 0; color: #111827; font-size: 16px;">${date} at ${time}</td>
                                        </tr>
                                        </table>
                                    </td>
                                    </tr>
                                </table>
                                
                                <!-- Additional Information -->
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 20px 0; background-color: #f0fdfa; border-radius: 6px; padding: 15px;">
                                    <tr>
                                        <td>
                                            <h3 style="margin: 0 0 10px; font-size: 16px; font-weight: 600; color: #0f766e;">Technical Information:</h3>
                                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td width="130" style="padding: 5px 0; font-weight: 600; color: #334155;">Browser:</td>
                                                <td style="padding: 5px 0; color: #111827;">${user_agent}</td>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                
                                <!-- Action Buttons
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0;">
                                    <tr>
                                    <td>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                                        <tr>
                                            <td class="button" align="center" style="background-color: #0f766e; border-radius: 6px; margin-right: 15px;">
                                            <a href="mailto:{{email}}" target="_blank" style="display: inline-block; padding: 14px 24px; font-size: 16px; color: #ffffff; text-decoration: none; font-weight: 600;">Reply to Message</a>
                                            </td>
                                            <td width="15"></td>
                                            <td class="button" align="center" style="background-color: #f3f4f6; border-radius: 6px;">
                                            <a href="https://yourwebsite.com/admin/contacts" target="_blank" style="display: inline-block; padding: 14px 24px; font-size: 16px; color: #374151; text-decoration: none; font-weight: 600;">View All Contacts</a>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    </tr>
                                </table> -->
                                
                                <p style="margin: 30px 0 0; font-size: 14px; line-height: 1.6; color: #6b7280; text-align: center; font-style: italic;">
                                    This is an automated notification. Please do not reply directly to this email.
                                </p>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f3f4f6; padding: 25px 40px; text-align: center;">
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">
                                    © 2025 Gigwork. All rights reserved.
                                </p>
                                <p style="margin: 10px 0 0; font-size: 14px; color: #6b7280;">
                                    You're receiving this email because you're the administrator of <a href="https://gigwork.co.in" target="_blank" style="color: #0f766e; text-decoration: none;">gigwork.co.in</a>
                                </p>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                </body>
            </html>
        `
    });

    if (error) {
        return console.error({ error });
    }

    console.log({ data });
}
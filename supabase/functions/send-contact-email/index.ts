import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  serviceInterestedIn?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, serviceInterestedIn, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact email for:", { name, email });

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Saunas Plus <onboarding@resend.dev>",
      to: [email],
      subject: "Thank You for Contacting Saunas Plus",
      html: `
        <h1>Thank You, ${name}!</h1>
        <p>We have received your inquiry and will get back to you within 24 hours.</p>
        <h2>Your Message Details:</h2>
        <p><strong>Service Interested In:</strong> ${serviceInterestedIn || "Not specified"}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p>Best regards,<br>The Saunas Plus Team</p>
        <p>678-245-9966 | contact@saunasplus.com</p>
      `,
    });

    // Send notification email to business
    const businessEmailResponse = await resend.emails.send({
      from: "Saunas Plus <onboarding@resend.dev>",
      to: ["contact@saunasplus.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Service Interested In:</strong> ${serviceInterestedIn || "Not specified"}</p>
        <h2>Message:</h2>
        <p>${message}</p>
      `,
    });

    console.log("Emails sent successfully:", { customerEmailResponse, businessEmailResponse });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
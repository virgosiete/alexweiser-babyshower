interface RSVPData {
  name: string;
  guests: number;
  status: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name, guests, status }: RSVPData = await req.json();

    // In a real implementation, you would use a service like Resend, SendGrid, or Nodemailer
    // For this demo, we'll simulate the email sending
    console.log('Sending RSVP email to alexis.weiser@example.com');
    console.log('RSVP Details:', { name, guests, status });

    // Simulate email content
    const emailContent = `
      New RSVP for Gender Reveal & Baby Shower
      
      Guest Name: ${name}
      Status: ${status === 'going' ? 'Going 🎉' : 'Not Going 😢'}
      ${status === 'going' ? `Number of Guests: ${guests}` : ''}
      
      Submitted at: ${new Date().toLocaleString()}
    `;

    // In production, replace this with actual email sending logic
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'RSVP email sent successfully',
        emailContent 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error sending RSVP email:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to send RSVP email' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
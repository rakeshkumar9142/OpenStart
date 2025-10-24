import nodemailer from 'nodemailer';

// Main function entrypoint
export default async ({ req, res, log, error }) => {
  try {
    // Get the event that triggered the function
    const event = req.headers['x-appwrite-event'];
    log('Function triggered by event: ' + event);

    // --- SAFETY CHECK (from our debugging) ---
    const EXPECTED_EVENT_PREFIX = 'databases.68c05c900023ab00a1f0.collections.openstart.documents.';
    if (!event || !event.startsWith(EXPECTED_EVENT_PREFIX) || !event.endsWith('.create')) {
      throw new Error(`Function was not triggered by a document.create event for the correct collection. Got: ${event}`);
    }
    
    // Get the newly created document (the user data)
    const newDocument = req.body;

    // Safety Check 2: Check for required data
    if (!newDocument.first_name || !newDocument.email) {
      error("Document (req.body) is missing 'first_name' or 'email'.");
      return res.json({ success: false, error: "Missing 'first_name' or 'email' in document." }, 400);
    }
    
    // Safety Check 3: Check for environment variables
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SENDER_EMAIL } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SENDER_EMAIL) {
      error("Missing required SMTP environment variables (HOST, PORT, USER, PASS, SENDER_EMAIL).");
      return res.json({ success: false, error: "Email server is not configured." }, 500);
    }

    // 1. Create the Nodemailer transporter
    let transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: parseInt(SMTP_PORT, 10) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // --- UPDATED EMAIL CONTENT ---

    // 2. Define the email options
    const mailOptions = {
      from: `The OpenStart Team <${SENDER_EMAIL}>`,
      to: newDocument.email,
      subject: "🎉 Welcome to OpenStart — Your Journey to Build, Lead, and Launch Begins!",
      html: `
        <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <p>Hi ${newDocument.first_name},</p>
          
          <p>We're thrilled to let you know that your application to join the <strong>OpenStart Alpha Cohort</strong> has been received successfully!</p>
          
          <p>This is your first step toward turning a high school idea into a global venture. You’re now part of a growing community of young builders, visionaries, and changemakers from across the world 🌍.</p>
          
          <h3 style="margin-top: 24px; margin-bottom: 12px;">What’s Next?</h3>
          <p>Our admissions team is currently reviewing all applications carefully.</p>
          <p>As this is a <strong>fully funded, merit-based program with only 50 seats worldwide</strong>, shortlisted candidates will be invited for a final interview soon.</p>
          <p>Please keep an eye on your inbox — you’ll hear from us shortly with your next steps!</p>
          
          <h3 style="margin-top: 24px; margin-bottom: 12px;">What Awaits You at OpenStart 🚀</h3>
          
          <p><strong>World-Class Mentorship:</strong> Learn directly from global experts who will guide your journey from idea to impact.</p>
          <p><strong>Global Team Collaboration:</strong> Build real projects with students from over 10+ countries.</p>
          <p><strong>Demo Day & Funding:</strong> Pitch your venture to investors and industry leaders at the end of the program.</p>
          <p><strong>Certificate of Completion:</strong> Earn a credential that strengthens your university profile and future applications.</p>
          
          <p style="margin-top: 20px;">Whether you're a visionary who dreams big, a builder who creates, or a leader who inspires — OpenStart is your global launchpad to build something that matters.</p>
          
          <p>We can’t wait to see what you’ll create. 🌟</p>
          
          <br>
          <p>Warm regards,<br>
          <strong>The OpenStart Team</strong><br>
          Rakesh, Viktoriia, Cheedhe & the Global Cohort Team
          </p>

          <hr style="border: 0; border-top: 1px solid #eee; margin-top: 24px;">

          <p style="font-size: 12px; color: #777;">
            <a href="https://open-start.vercel.app" style="color: #007bff; text-decoration: none;">https://open-start.vercel.app</a>
          </p>
          <p style="font-size: 12px; color: #777;">
            👉 Follow us on LinkedIn for updates, opportunities, and stories from our global community:<br>
            <a href="https://www.linkedin.com/company/opnstart" style="color: #007bff; text-decoration: none;">linkedin.com/company/opnstart</a>
          </p>
        </div>
      `
    };
    
    // --- END OF UPDATED CONTENT ---

    // 3. Send the email
    log(`Attempting to send email to ${newDocument.email}...`);
    await transporter.sendMail(mailOptions);
    log(`Email sent successfully to ${newDocument.email}.`);

    // 4. Return a success response
    return res.json({ success: true, message: 'Welcome email sent.' });

  } catch (err) {
    // If anything goes wrong, log the error and return a failure response
    error(err.message);
    return res.json({ success: false, error: err.message }, 500);
  }
};


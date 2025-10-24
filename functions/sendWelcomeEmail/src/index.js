    // Import the nodemailer library
    import nodemailer from 'nodemailer';

    /**
     * Appwrite Function Entry Point
     * @param {object} req - Request object with context, headers, and payload.
     * @param {object} res - Response object to send data back.
     */
    export default async ({ req, res, log, error }) => {
      // 1. VERIFY THE TRIGGER
      if (
        !process.env.APPWRITE_FUNCTION_EVENT ||
        !process.env.APPWRITE_FUNCTION_EVENT_DATA ||
        process.env.APPWRITE_FUNCTION_EVENT !== 'databases.68c05c900023ab00a1f0.collections.openstart.documents.create'
      ) {
        error('Function was not triggered by the correct database event.');
        return res.json({ success: false, message: 'Invalid event trigger.' }, 400);
      }

      // 2. CHECK FOR REQUIRED ENVIRONMENT VARIABLES
      const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SENDER_EMAIL } = process.env;
      if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SENDER_EMAIL) {
        error('Missing required SMTP environment variables (HOST, PORT, USER, PASS, SENDER_EMAIL).');
        return res.json({ success: false, message: 'Missing SMTP configuration.' }, 500);
      }

      try {
        // 3. PARSE THE EVENT DATA
        const eventData = JSON.parse(process.env.APPWRITE_FUNCTION_EVENT_DATA);

        // --- THIS IS THE FIX ---
        // Get the data from the new document using your column name "first_name"
        const { first_name, email } = eventData;
        const firstName = first_name; // Use this variable in the email template
        // --- END OF FIX ---

        // Validate we have the data we need from the document
        if (!firstName || !email) {
          error(`Document ${eventData.$id} is missing 'first_name' or 'email'.`);
          return res.json({ success: false, message: 'Document missing required fields.' }, 400);
        }

        log(`Processing welcome email for: ${firstName} (${email})`);

        // 4. CONFIGURE NODEMAILER
        let transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: parseInt(SMTP_PORT, 10),
          secure: parseInt(SMTP_PORT, 10) === 465, // true for 465, false for other ports
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });

        // 5. DEFINE EMAIL OPTIONS
        const mailOptions = {
          from: `The OpenStart Team <${SENDER_EMAIL}>`, // Sender address
          to: email, // List of receivers
          subject: '🎉 Welcome to OpenStart Alpha Cohort!', // Subject line
          text: `Hi ${firstName},\n\nWelcome to the OpenStart Alpha Cohort! 🎓\nWe’re excited to have you onboard. Our team will contact you soon with further details.\n\nBest regards,\nThe OpenStart Team`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2 style="color: #333;">Hi ${firstName},</h2>
              <p>Welcome to the <strong>OpenStart Alpha Cohort!</strong> 🎓</p>
              <p>We’re excited to have you onboard. Our team will contact you soon with further details.</p>
              <br>
              <p>Best regards,<br>
              The OpenStart Team</p>
            </div>
          `,
        };

        // 6. SEND THE EMAIL
        await transporter.sendMail(mailOptions);

        log(`Successfully sent email to ${email}`);
        return res.json({ success: true, message: `Email sent to ${email}` });

      } catch (err) {
        // 7. HANDLE ERRORS
        error(`Failed to send email: ${err.message}`);
        error(err.stack); // Log the full stack trace for debugging
        return res.json({ success: false, message: err.message }, 500);
      }
    };
    

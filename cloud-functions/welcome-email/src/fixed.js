const nodemailer = require('nodemailer');

module.exports = async function (context) {
  console.log('🚀 Welcome email function started');
  
  try {
    let payload;
    
    // Handle different trigger types
    if (context.req.variables && context.req.variables.APPWRITE_FUNCTION_EVENT_DATA) {
      // Database trigger
      console.log('📋 Database trigger detected');
      payload = JSON.parse(context.req.variables.APPWRITE_FUNCTION_EVENT_DATA);
    } else if (context.req.body) {
      // HTTP execution - fix the JSON parsing
      console.log('🌐 HTTP trigger detected');
      console.log('📦 Raw body:', context.req.body);
      console.log('📦 Body type:', typeof context.req.body);
      
      if (typeof context.req.body === 'string') {
        // The body is coming as a string but not proper JSON
        // Let's try to parse it as URL-encoded data or convert it to proper JSON
        if (context.req.body.includes('{') && context.req.body.includes('}')) {
          // It has braces but might not be valid JSON, try to fix it
          try {
            // Try to parse as-is first
            payload = JSON.parse(context.req.body);
          } catch (e) {
            // If that fails, try to convert to proper JSON
            const fixedBody = context.req.body
              .replace(/(\w+):/g, '"$1":')  // Add quotes around keys
              .replace(/: ([^,}\s]+)/g, ': "$1"');  // Add quotes around string values
            
            try {
              payload = JSON.parse(fixedBody);
            } catch (e2) {
              // Last resort: parse as query string
              const params = new URLSearchParams(context.req.body.replace(/{|}/g, '').replace(/, /g, '&').replace(/: /g, '='));
              payload = {
                first_name: params.get('first_name') || params.get('"first_name"'),
                email: params.get('email') || params.get('"email"'),
                graduation_year: params.get('graduation_year') || params.get('"graduation_year"'),
                country: params.get('country') || params.get('"country"')
              };
            }
          }
        } else {
          // Parse as query string
          const params = new URLSearchParams(context.req.body);
          payload = {
            first_name: params.get('first_name'),
            email: params.get('email'),
            graduation_year: params.get('graduation_year'),
            country: params.get('country')
          };
        }
      } else {
        payload = context.req.body;
      }
    } else {
      throw new Error('No data provided');
    }
    
    console.log('📝 Processing payload:', JSON.stringify(payload, null, 2));
    
    // Extract user data
    const userData = {
      firstName: payload.first_name || 'there',
      email: payload.email
    };

    if (!userData.email) {
      throw new Error('❌ User email is required');
    }

    console.log('📧 Preparing to send email to:', userData.email);

    // Get environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUsername = process.env.SMTP_USERNAME;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const fromEmail = process.env.FROM_EMAIL || 'OpenStart <noreply@openstart.com>';

    console.log('🔧 SMTP Configuration check:', {
      host: !!smtpHost,
      port: smtpPort,
      username: !!smtpUsername,
      password: !!smtpPassword,
      from: fromEmail
    });

    if (!smtpHost || !smtpUsername || !smtpPassword) {
      throw new Error('❌ SMTP configuration is missing');
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: false,
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });

    // Verify SMTP connection
    console.log('🔌 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    // Create email content
    const emailTemplate = {
      from: fromEmail,
      to: userData.email,
      subject: '🎉 Welcome to OpenStart Alpha Cohort!',
      text: `Hi ${userData.firstName},\n\nWelcome to the OpenStart Alpha Cohort! 🎓\nWe're excited to have you onboard. Our team will contact you soon with further details.\n\nBest regards,\nThe OpenStart Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">🎉 Welcome to OpenStart Alpha Cohort!</h2>
          <p>Hi <strong>${userData.firstName}</strong>,</p>
          <p>Welcome to the OpenStart Alpha Cohort! 🎓<br>
          We're excited to have you onboard. Our team will contact you soon with further details.</p>
          <p>Best regards,<br><strong>The OpenStart Team</strong></p>
        </div>
      `
    };

    // Send the email
    console.log('📤 Sending email...');
    const emailResult = await transporter.sendMail(emailTemplate);
    console.log('✅ Welcome email sent to:', userData.email);
    console.log('📨 Email ID:', emailResult.messageId);

    // Return success response
    return context.res.json({
      success: true,
      message: 'Welcome email sent successfully',
      recipient: userData.email,
      emailId: emailResult.messageId
    });

  } catch (error) {
    console.error('❌ Error sending welcome email:', error.message);
    
    return context.res.json({
      success: false,
      error: error.message
    }, 500);
  }
};
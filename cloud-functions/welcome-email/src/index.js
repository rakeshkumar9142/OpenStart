const { Client } = require('node-appwrite');
const nodemailer = require('nodemailer');

module.exports = async function (context) {
  console.log('🚀 Welcome email function started');
  
  try {
    let payload;
    
    // Handle different trigger types in Appwrite Cloud Functions
    if (context.req.variables && context.req.variables.APPWRITE_FUNCTION_EVENT_DATA) {
      // Database trigger - parse the event data
      console.log('📋 Database trigger detected');
      payload = JSON.parse(context.req.variables.APPWRITE_FUNCTION_EVENT_DATA);
    } else if (context.req.body) {
      // HTTP execution - parse the body
      console.log('🌐 HTTP trigger detected');
      console.log('📦 Raw body:', context.req.body);
      console.log('📦 Body type:', typeof context.req.body);
      
      // Handle different body formats
      if (typeof context.req.body === 'string') {
        try {
          payload = JSON.parse(context.req.body);
        } catch (e) {
          // If it's a string but not JSON, use it as raw data
          payload = { email: context.req.body };
        }
      } else if (typeof context.req.body === 'object') {
        payload = context.req.body;
      } else {
        throw new Error(`Unsupported body type: ${typeof context.req.body}`);
      }
    } else if (context.req.variables && context.req.variables.APPWRITE_FUNCTION_DATA) {
      // Alternative data source
      console.log('🔧 APPWRITE_FUNCTION_DATA detected');
      const data = context.req.variables.APPWRITE_FUNCTION_DATA;
      payload = typeof data === 'string' ? JSON.parse(data) : data;
    } else {
      // Log all available information for debugging
      console.log('🔍 Available context:', {
        hasReq: !!context.req,
        hasBody: !!(context.req && context.req.body),
        hasVariables: !!(context.req && context.req.variables),
        variablesKeys: context.req && context.req.variables ? Object.keys(context.req.variables) : [],
        bodyType: context.req && context.req.body ? typeof context.req.body : 'none'
      });
      throw new Error('No data provided for email sending. Available data sources were empty.');
    }
    
    console.log('📝 Processing payload:', JSON.stringify(payload, null, 2));
    
    // Extract user data with multiple possible field names
    const userData = {
      firstName: payload.first_name || payload.firstName || payload.name || 'there',
      email: payload.email,
      graduationYear: payload.graduation_year || payload.graduationYear,
      country: payload.country
    };

    if (!userData.email) {
      throw new Error('❌ User email is required');
    }

    console.log('📧 Preparing to send email to:', userData.email);

    // Get environment variables
    const smtpHost = process.env.SMTP_HOST || (context.req.variables ? context.req.variables.SMTP_HOST : null);
    const smtpPort = process.env.SMTP_PORT || (context.req.variables ? context.req.variables.SMTP_PORT : null) || 587;
    const smtpUsername = process.env.SMTP_USERNAME || (context.req.variables ? context.req.variables.SMTP_USERNAME : null);
    const smtpPassword = process.env.SMTP_PASSWORD || (context.req.variables ? context.req.variables.SMTP_PASSWORD : null);
    const fromEmail = process.env.FROM_EMAIL || (context.req.variables ? context.req.variables.FROM_EMAIL : null) || 'OpenStart <noreply@openstart.com>';

    console.log('🔧 SMTP Configuration check:', {
      host: !!smtpHost,
      port: smtpPort,
      username: !!smtpUsername,
      password: !!smtpPassword,
      from: fromEmail
    });

    if (!smtpHost || !smtpUsername || !smtpPassword) {
      throw new Error('❌ SMTP configuration is missing. Required: SMTP_HOST, SMTP_USERNAME, SMTP_PASSWORD');
    }

    // Configure email transporter
    const transporter = nodemailer.createTransporter({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: smtpPort === '465' || smtpPort === 465,
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
    const response = {
      success: true,
      message: 'Welcome email sent successfully',
      recipient: userData.email,
      emailId: emailResult.messageId
    };

    console.log('✅ Function completed successfully');

    // Return response for Appwrite Cloud Functions
    return context.res.json(response);

  } catch (error) {
    console.error('❌ Error sending welcome email:', error.message);
    console.error('🔍 Error details:', error);
    
    const errorResponse = {
      success: false,
      error: error.message
    };

    // Return error response for Appwrite Cloud Functions
    return context.res.json(errorResponse, 500);
  }
};
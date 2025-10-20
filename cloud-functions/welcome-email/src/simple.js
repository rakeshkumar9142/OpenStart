const nodemailer = require('nodemailer');

module.exports = async ({ req, res }) => {
  console.log('🚀 Simple welcome email function started');
  
  try {
    // Simple hardcoded test data
    const userData = {
      firstName: "Test User", 
      email: "rakeshkumarr60034@gmail.com"
    };

    console.log('📧 Sending to:', userData.email);

    // Get environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUsername = process.env.SMTP_USERNAME;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const fromEmail = process.env.FROM_EMAIL || 'OpenStart <noreply@openstart.com>';

    console.log('🔧 Config check:', {
      host: !!smtpHost,
      username: !!smtpUsername, 
      password: !!smtpPassword
    });

    if (!smtpHost || !smtpUsername || !smtpPassword) {
      throw new Error('Missing SMTP configuration');
    }

    // Configure email transporter
    const transporter = nodemailer.createTransporter({
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

    // Send email
    const emailResult = await transporter.sendMail({
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
    });

    console.log('✅ Email sent successfully! ID:', emailResult.messageId);

    return res.json({
      success: true,
      message: 'Welcome email sent successfully',
      recipient: userData.email,
      emailId: emailResult.messageId
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    return res.json({
      success: false,
      error: error.message
    }, 500);
  }
};
const postmark = require('postmark');

module.exports = async (req, res) => {
  const { email } = req.query;
  console.log(`sending email to ${email}...`);
  // ensure email is provided
  if (!email) {
    return res.status(400).send('Email address is required');
  }

  // configure Postmark
  const client = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);

  // configure the message
  const msg = {
    From: 'test@bbi.space',
    To: email,
    Subject: 'Test Email',
    TextBody: 'This is a test email sent using Postmark and Vercel.'
  };

  try {
    // send the email
    await client.sendEmail(msg);
    // respond with success message
    res.status(200).send('Email sent successfully');
  } catch (error) {
    // respond with error message
    console.error(error);
    res.status(500).send('Error sending email');
  }
};

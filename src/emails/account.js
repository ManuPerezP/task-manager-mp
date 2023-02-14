const sgMail = require("@sendgrid/mail");
// const sendgridKey =
//   "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";

// sgMail.setApiKey(sendgridKey);
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// sgMail.send({
//   to: "manuel.pp@globant.com",
//   from: "manuel.pp@globant.com",
//   subject: "Email test from sendgrid",
//   text: "Hi this is my first test with email API from sendgrid",
// });

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "manuel.pp@globant.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "manuel.pp@globant.com",
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};

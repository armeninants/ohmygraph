const path = require('path');
const nodemailer = require('nodemailer');
const Email = require('email-templates');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS
  }
});

const defaultOptions = {
  from: `"${process.env.SITE_NAME}" <${process.env.EMAIL_ADDRESS}>`,
};

function send(options) {
  return new Promise((resolve, reject) => {
    const opt = Object.assign({}, defaultOptions, options);

    transporter.sendMail(opt, (error, info) => {
      if (error){
        return reject(new Error(error.message || 'Could not send an email'));
      }

      resolve({'Message ID': info.messageId});
    });
  });
}

function sendAnonymousEmail(options) {
  const email = new Email({
    views: {
      root: path.join(__dirname, '../emails')
    },
    message: {
      from: defaultOptions.from,
      to: defaultOptions.from,
    },
    transport: transporter
  });

  return email.send({
    template: 'anonymousEmail',
    locals: options
  })
}

module.exports = {send, sendAnonymousEmail};

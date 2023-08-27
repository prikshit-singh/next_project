import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chiefspammer@yourgreatdomain.com',
    pass: 'SuperSecretPassword' // naturally, replace both with your real credentials or an application-specific password
  }
});

const mailOptions = {
  from: 'prikshitlatherlather@gmail.com',
  to: 'prikshitsingh644@gmail.com',
  subject: 'Invoices due',
  text: 'Dudes, we really need your money.'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
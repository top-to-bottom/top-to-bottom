const router = require('express').Router()
const nodemailer = require('nodemailer');
// const {isAuthMW} = require('../middleware/auth')
module.exports = router

router.post('/welcome', async (req, res, next) => {
  console.log('REQ.BODY IN POST /welcome', req.body)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'OnlyShoesAndHats@gmail.com',
      pass: '#t0p2BOTOM'
    }
  });

  const mailOptions = {
    from: 'OnlyShoesAndHats@gmail.com',
    to: `${req.body.recipient}`,
    subject: 'Welcome to Top-To-Bottom, a hat and shoe store.',
    html: `<h1><a href="https://top-to-bottom.herokuapp.com">Welcome to Top-To-Bottom!</a></h1><p>Dear ${req.body.firstName} (aka ${req.body.username}),<br>Thanks for signing up at <a href="https://top-to-bottom.herokuapp.com">Top-To-Bottom</a>!</p><p>We got you covered at head and toe, but never in the middle.</p><br>Cheers!`
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(201).send('Email Sent!')
    }
  });
})



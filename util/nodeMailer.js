const nodemailer = require('nodemailer');
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);


oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});


module.exports.sendMail = async (mailOptions) => {
  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        console.log(err);
        reject();
      }
      resolve(token);
    });
  });

  // console.log('accessToken', accessToken)
  const transpoter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: "OAuth2",
      user: 'foll.classroom@gmail.com',
      accessToken,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    },
    tls: {
      rejectUnauthorized: false,
    }
  });
  await transpoter.sendMail(mailOptions);
}
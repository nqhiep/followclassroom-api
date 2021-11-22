const emailService = require('./emailService')
const nodemailer = require('nodemailer');

class emailControler {
    async postEmail(req, res) {
        const user = await emailService.findUserbyId(req.user.id);
        const clss = await emailService.findClassbyId(req.body.class_id);
        const roleInvite = req.body.role;
        let clsslink = clss.student_link;

        if (roleInvite==='teacher') {clsslink = clss.teacher_link;}

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'minhhieunguyen23121999@gmail.com',
              pass: 'hieu251173650'
            }
        });
          
        const mailOptions = {
            from: 'minhhieunguyen23121999@gmail.com',
            to: req.body.email,
            subject: 'Invite join Class by Me',
            html:   '<div>' +
                        '<h1>Xin Chào</h1>' +
                        `<p>Bạn nhận được link ${roleInvite} join class:</p>` + 
                        `<a href='http://localhost:3001/classlink/sign-in/${clsslink}'>Join tại đây</a>` +
                        `<p>Từ ${user.email}. Chân trọng!</p>` +
                    '</div>'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
                res.json(`Khai báo thành công ${info.response}`);
            }
        });
    }
}

module.exports = new emailControler();
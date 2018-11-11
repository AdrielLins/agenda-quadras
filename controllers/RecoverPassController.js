'use strict';
const User = require('../models/UserModel');
const nodemailer = require('nodemailer');
const randomToken = require('random-token');

exports.RecoverPass = function (req, res) {
    console.log("Start creation of a tokent and set on user Email")
    var userToRecover = req.body.email
    //create token to url
    var generateToken = randomToken(5)
    try {
        setUserSetToken();
    } catch (error) {
        console.log(error)
    }
    function setUserSetToken(req, res) {

        User.findOne({ email: userToRecover }).exec(function (err, doc) {
            if (err) {
                console.log("Error finding e-mail")
                console.log(err)
                return;
            }
            if (!doc) {
                console.log("Error, email doesnt exists")
                return
            } else {
                User.findOneAndUpdate({ email: userToRecover },
                    {
                        token: generateToken
                    },
                    { new: true }, function (err, doc) {
                        if (err) {
                            console.log("Error updating e-mail")
                            console.log(err)
                            return;
                        } else {
                            console.log("Token setado para o email: " + userToRecover);
                        }
                    });
            }
        });
    };

    console.log("Start Sending Email")
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'agendaquadrasAdriel@gmail.com',
            pass: 'agenda1020'
        }
    });

    var htmlBody = '<p>Para continuar com a recuperação de senha, favor insira este código no campo: </p>' +'<h2>Código : ' +generateToken+'</h2>' // plain text body
    var mailOptions = {
        from: '"AgendaQuadras" <agendaquadrasAdriel@gmail.com>', // sender address
        to: userToRecover, // list of receivers
        subject: 'Recuperação de senha', // Subject line
        html: htmlBody
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        res.send(200);
    });
}
exports = module.exports = {};

exports.hello = function () {
    return 'Hello World';
};



//var nodemailer = require('nodemailer');

//exports.mail = function () {
    
//    var transport = nodemailer.createTransport('SMTP', {
//        service: 'Gmail',
//        auth: {
//            user: 'coolsapmmail@gmail.com',
//            pass: 'interhagit78'
//        }
//    });
    
//    if (process.env.NODE_ENV === 'production') { // [2]
//        process.on('uncaughtException', function (er) {
//            console.error(er.stack); // [3]
//            transport.sendMail({
//                from: 'alerts@mycompany.com',
//                to: 'alert@mycompany.com',
//                subject: er.message,
//                text: er.stack // [4]
//            }, function (er) {
//                if (er)
//                    console.error(er);
//                process.exit(1); // [5]
//            });
//        });
//    }
//};

//exports.sendOne = function (template, locals, err) {
//    var message = {
//        from: config.mailer.defaultFromAddress,
//        to: locals.email,
//        subject: locals.subject,
//        html: locals.html,
//        text: locals.text
//    };
//    console.log('hitlocal email');
//    console.log(message);
//    //console.log(message.to.locals.email);
//    if (!locals.email) {
//    //    console.log('email err');
//    }
    
//    if (!locals.subject) {
//        console.log('subj err');
//    }
    
//    // template
//    var transport = smtpTransport;
//    // console.log('hit here');
//    // console.log(transport);
//    transport.sendMail(message, function (err) {
//        if (err) {
//            console.log('email js error');
//            console.log(err);
//        }
//        console.log('Message sent');

//       //return fn(null, responseStatus.message, html, text);
//    });

//};
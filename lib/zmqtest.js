var zmq = require('zmq');

exports = module.exports = {};

exports.testzmqserver = function () {
   
    var responder = zmq.socket('rep');

    responder.on('message', function (request) {
        console.log('Received request: [', request.toString(), ']');
        setTimeout(function () {
            responder.send(request.toString() + ' World');
        }, 0);
    });

    responder.bind('tcp://*:5555', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Listening on 5555…');
        }
    });

    process.on('SIGINT', function () {
        console.log('SIGINT');
        responder.close();
    });
};

exports.testzmqclient = function (msg,done) {

    var requester = zmq.socket('req');
    
    requester.on('message', function (reply) {
        console.log('Received reply: [', reply.toString(), ']');
        requester.close();
        done(reply.toString());
        ////process.exit(0);
    });
   
    requester.connect('tcp://localhost:5555');
    requester.send(msg);
    
    process.on('SIGINT', function () {
        requester.close();
    });
};


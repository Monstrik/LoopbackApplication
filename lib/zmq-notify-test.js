module.exports = function (app) {
    
    var zmq = require('zmq');
    var notification = zmq.socket('push');
    var counter = 0;
    var fs = require('fs');
    var notifyExample = JSON.parse(
        fs.readFileSync('data_examples/notification.json', 'utf8'));
    
    // bind to an address and port
    notification.bind('tcp://0.0.0.0:3001', function (err) {
        if (err) {
            console.log(err.message);
            process.exit(0);
        }
        
        setInterval(function () {
            ++counter;
            console.log('Send ZMQ push 3001, msgid: ', counter + '\n');
            notification.send(JSON.stringify(notifyExample));
        }, 3000);
    });
};
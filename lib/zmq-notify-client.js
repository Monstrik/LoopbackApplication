
module.exports = function (app) {
    
    var zmq = require('zmq');
    var notification = zmq.socket('pull');
    var variables = app.models.Variables;
    
    function onMessage(msg) {
        //console.log('Received message(pull):', msg.toString());
        console.log('Received message(pull)');
        try {
            var update = JSON.parse(msg);
            //Add update to the model
            //variables.upsert(update.data);
        } catch (err) {
            console.log('[ZMQ pull onMessage] error:', err);
        }
    }
    
    function onError(err) {
        console.log('Received message eror:', err.toString());
    }
    
    notification.on('message', onMessage);
    notification.on('error', onError);
    
    
    
    notification.connect('tcp://localhost:3001', function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Connected to the Driver zmq type: pull, port 3001 OK');
    });
};

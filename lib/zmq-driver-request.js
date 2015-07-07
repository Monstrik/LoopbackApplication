module.exports = function (app) {
    
    var zmq = require('zmq');
    var fs = require('fs');
    var requester = zmq.socket('dealer');
    requester.identity = 'md_node';
    var variables = app.models.Variables;
    var counter = 0;
    var requestAllTemplate = JSON.parse(
        fs.readFileSync('server/request-all-variables.json', 'utf8'));
    
    function onError(err) {
        console.log('Received message error:', err.toString());
    }
    
    function onMessage(msg) {
        console.log('Received message(req):', msg.toString());
        
        try {
            var update = JSON.parse(msg);
            
            //Add update to the model
            variables.upsert(update.data);
        } catch (err) {
            console.log('[ZMQ req onMessage] error:', err);
        }
    }
    
    requester.on('message', onMessage);
    requester.on('error', onError);
    
    function sendRequest(msg) {
        try {
            requester.send(msg);
        } catch (err) {
            console.log('ZMQ sendRequest err: ', err);
        }
    }
    
    function sendGetAllVariablesRequest() {
        requestAllTemplate.msgid = ++counter;
        sendRequest(JSON.stringify(requestAllTemplate));
    }
    
    console.log('Connecting to the Driver zmq type: req, port 3002');
    requester.connect('tcp://localhost:3002', function (err) {
        if (err) {
            console.log(err);
            return;
        }
        
        console.log('Connected to the Driver zmq type: req, port 3002 OK');
    });
    
    //Request all variables once connected
    sendGetAllVariablesRequest();
};

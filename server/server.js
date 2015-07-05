var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function () {
    // start the web server
    return app.listen(function () {
        app.emit('started');
        console.log('Web server listening at: %s', app.get('url'));
    });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
    if (err) throw err;

    //// start the server if `$ node server.js`
    //if (require.main === module)
    //  app.start();
    
    
    var runZmqSubscriber = function () {
        
        var zmq = require('zmq');
        var port = 'tcp://127.0.0.1:12345';
        
        var zmqsocket = zmq.socket('sub');
        
        zmqsocket.identity = 'zmq-subscriber' + process.pid;
        zmqsocket.connect(port);
        zmqsocket.subscribe('AAPL');
        zmqsocket.subscribe('GOOG');
        zmqsocket.subscribe('MSFT');
        
        console.log(zmqsocket.identity + 'connected!');
        zmqsocket.on('message', function (data) {
            console.log(zmqsocket.identity + ': received:' + data.toString());
            app.io.emit('live status', data.toString());
        });
    };
    

    runZmqSubscriber();

    if (require.main === module) {
        //app.start();
        app.io = require('socket.io')(app.start());

        app.io.on('connection', function (socket) {
            console.log('A web user connected');

            socket.on('chat message', function (msg) {
                console.log('Got message: ' + msg);
                app.io.emit('chat message', msg);
            });
            
            socket.on('set value', function (msg) {
                console.log('Got set value message: ' + msg);
                app.io.emit('set value', msg);
            });
            
            

            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
        });

    }

});



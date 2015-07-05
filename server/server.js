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
        
        var socket = zmq.socket('sub');
        
        socket.identity = 'zmq-subscriber' + process.pid;
        socket.connect(port);
        socket.subscribe('AAPL');
        socket.subscribe('GOOG');
        console.log(socket.identity + 'connected!');
        socket.on('message', function (data) {
            console.log(socket.identity + ': received data ' + data.toString());
            app.io.emit('chat message', data.toString());
        });
    }
    

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

            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
        });

    }

});




var cluster = require('cluster')
  , zmq = require('zmq')
  , port = 'tcp://127.0.0.1:12345';

if (cluster.isMaster) {
    for (var i = 0; i < 5; i++) cluster.fork();
    
    cluster.on('death', function (worker) {
        console.log('worker ' + worker.pid + ' died');
    });
    
    //publisher = send only
    
    var socket = zmq.socket('pub');
    
    socket.identity = 'zmq publisher' + process.pid;
    
    var stocks = ['AAPL', 'GOOG', 'YHOO', 'MSFT', 'INTC'];
    
    socket.bind(port, function (err) {
        if (err) throw err;
        console.log('bound!');
        
        setInterval(function () {
            var symbol = stocks[Math.floor(Math.random() * stocks.length)]
              , value = Math.random() * 1000;
            
            console.log(socket.identity + ': sent ' + symbol + ' ' + value);
            socket.send(symbol + ' ' + value);
        }, 5000);
    });
} else {
    //subscriber = receive only
    
    var socket = zmq.socket('sub');
    
    socket.identity = 'zmq-subscriber' + process.pid;
    
    socket.connect(port);
    
    socket.subscribe('AAPL');
    socket.subscribe('GOOG');
    
    console.log(socket.identity + 'connected!');
    
    socket.on('message', function (data) {
        console.log(socket.identity + ': received data ' + data.toString());
    });
}

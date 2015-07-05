module.exports = function (app) {
    // Install a "/ping" route that returns "pong"
    app.get('/ping', function (req, res) {
        res.send('pong');
    });
    
    //express way
    var router = app.loopback.Router();
    router.get('/info', app.loopback.status());
    router.get('/status', app.loopback.status());
    app.use(router);
};


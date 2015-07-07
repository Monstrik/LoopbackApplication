module.exports = function (app) {
    var Req = require('../../lib/zmq-driver-request');
    var Notifications = require('../../lib/zmq-notify-client');
    var NotificationsTest = require('../../lib/zmq-notify-test');
    
    //Run ZMQ requester
    var r = new Req(app);
    
    //Run ZMQ notification service
    var ni = new Notifications(app);
    
    var nit = new NotificationsTest(app);

};

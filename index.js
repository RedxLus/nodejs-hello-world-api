"use strict";

// required modules
var os = require('os');
var express = require('express');
var bodyParser = require('body-parser');
var async = require('async');
var cfenv = require("cfenv");
var path = require('path');

// configs from env vars
var appEnv = cfenv.getAppEnv();

if(!appEnv.isLocal){
    console.log("appEnv.isLocal=", appEnv.isLocal);
}

// new express app
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/json
app.use(bodyParser.json());

// swagger ui for api is static resource
app.use('/swagger', express.static(path.join(__dirname, 'swagger')));

// hello world
app.get('/', function (req, res) {
    res.send('Hello World !');
});

// app listen
app.listen(8080, function () {
    var netList = os.networkInterfaces();
    var ips = [];

    if (netList.Ethernet0 !== undefined) {
        for (var i = 0; i < netList.Ethernet0.length; i++) {
            var ipv4 = '';

            if (netList.Ethernet0[i].family === "IPv4") {
                ipv4 = netList.Ethernet0[i].address;
            }

            if (ipv4.length > 0)
                ips.push(ipv4);
        }
    }

    console.log('App listening on hostname "' + os.hostname() + '", with ips ' + ips.join(',') + ' port 8080');
});
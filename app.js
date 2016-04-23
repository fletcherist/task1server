var express = require('express');
var request = require('request');
var parser = require('xml2json');


var app = express();
var port = 1337;
app.listen(port, function() {
  console.log('listening on ' + port);
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.get('/get/:channel/:time', function (req, res) {
  var channel = req.params.channel;
  var time = req.params.time;
  request('http://www.programma.tv/3.001/day/' + channel +'/' + time + '/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body);
      var body = body;
      convertToJson(body);
    }
  });

  var convertToJson = function (xml) {
    var json = parser.toJson(xml);
    console.log(json);
    sendJson(json);
  }

  var sendJson = function (json) {
    return res.send(json);
  }
});

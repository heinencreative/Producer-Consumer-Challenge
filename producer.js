// Producer.js is designed to generate random math expression
// and POST it as JSON {'expression':'1+2='} to the server
var http = require('http');
var calc = require('./lib/calc');
var helper = require('./lib/helper');
var argv = require('minimist')(process.argv.slice(2));

var responseObj = {},
    host = 'localhost',
    port = argv.port || 3000, // Set port value, default 3000
    integer = (typeof argv.integer !== 'undefined') ? (argv.integer === "true") : true, // Use integer or float in math expression, default = true
    lowerLimit = argv.lowerLimit || 1, // Set lower limit of random numbers, default = 1
    upperLimit = argv.upperLimit || 100, // Set upper limit of random numbers, default = 100
    requestDelay = argv.requestDelay || 1000; // Time in ms between requests, default = 1000

// POST a math expression at an interval of requestDelay
var t = setInterval(function(){
        var expression = '';
        // Build a mathmatical expression from random numbers and operator
        expression = calc.randomNumber(lowerLimit,upperLimit,integer);
        expression += calc.operators[Math.floor(Math.random() * 4)];
        expression += calc.randomNumber(lowerLimit,upperLimit,integer);
        expression += '=';

        helper.log('Generated: '+expression);
        postExpression(expression);
      },requestDelay);

// Build and send a POST request containing JSON. For example, {'expression':'1+2='}
function postExpression(expression) {
  // JSON data to be sent
  var postData = JSON.stringify({
    'expression' : expression
  });

  // HTTP request options
  var options = {
    hostname: host,
    port: port,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };

  // Build requst
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    // Log response data
    res.on('data', function (chunk) {
      helper.log('Response: '+chunk);
    });
  });

  // Log errors
  req.on('error', function(e) {
    helper.log('Problem with request: ' + e.message);
  });

  // Write JSON data to request body
  req.write(postData);
  req.end();
}

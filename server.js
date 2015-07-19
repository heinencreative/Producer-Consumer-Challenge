// Server.js is a HTTP server designed to receive a math
// expressions in JSON, compute the answer and respond
// with either the correct answer or an appropriate error.
var http = require('http');
var url = require('url');
var helper = require('./lib/helper');
var calc = require('./lib/calc');
var argv = require('minimist')(process.argv.slice(2));

var port = argv.port || 3000; // Set port value, default 3000

// Handle math expression requests
function requestHandler(req,res) {
    var body = '',
        requestObj = {},
        result = {};

    // Write data to body
    req.on('data', function(data) {
        body += data.toString();
    });

    // End request and parse request body as JSON
    req.on('end', function() {
        if (body) requestObj = JSON.parse(body);
        helper.log('Request: '+body);
        // If no expression provided, respond with error
        if (!requestObj.hasOwnProperty('expression')) {
            result.status = 'error';
            result.message = "Expecting a POST request with JSON. For example, {'expression':'1+2='}";
            helper.log('Response: '+JSON.stringify(result));
            res.statusCode = 400;
            res.end(JSON.stringify(result));
            return;
        }

        // Parse the request JSON and return an array
        var parsed = helper.parse(requestObj.expression);

        // If expression could not be parsed
        if (!parsed) {
            result.status = 'fail';
            result.data = {};
            result.data.expression = "Invalid expression, '"+requestObj.expression+"'. Should follow pattern, '1+2='.";
            helper.log('Response: '+JSON.stringify(result));
            res.statusCode = 400;
            res.end(JSON.stringify(result));
            return;
        }

        // TODO this is a temporary response, replace with actual calculation
        res.end(JSON.stringify({status:"success"}));
    });
}

// Fire it up!
http.createServer(requestHandler).listen(port,function(){
    console.log('Listening for requests on port: ' + port);
});

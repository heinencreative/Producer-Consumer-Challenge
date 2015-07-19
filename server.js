// Server.js is a HTTP server designed to receive a math
// expressions in JSON, compute the answer and respond
// with either the correct answer or an appropriate error.
var http = require('http');
var url = require('url');
var helper = require('./lib/helper');
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
        res.end(JSON.stringify({status:"success"}));
    });
}

// Fire it up!
http.createServer(requestHandler).listen(port,function(){
    console.log('Listening for requests on port: ' + port);
});

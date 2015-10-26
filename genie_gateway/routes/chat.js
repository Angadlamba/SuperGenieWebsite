var express = require('express');
var router = express.Router();

//Load the request module
var request = require('request');

var delay = function(n) {
	for (var i=0 ; i<n; i++) {

	}
}

/* GET home page. */
router.get('/', function(req, res, next) {
	// When this is hit, do the authentication. This will not come here, it will be in gateway's global middleware.

	// Now that it came here, it means the user is authenticated, let's try to send a message to the chat service, which will
	// log a chat to the console and return a success message.
	//Lets configure and request
	console.log("First: ", new Date().getTime());
	delay(100000);

	request({
		    url: 'http://localhost:3000/chat', //URL to hit
		    //qs: {from: 'blog example', time: +new Date()}, //Query string data
		    method: 'POST',
		    //Lets post the following key/values as form
		    json: {
		        message: 'this is my first chat',
		        user_id: '23'
		    }
		}, function(error, response, body){
		    if(error) {
		        console.log(error);
		        res.json(error);
		    } else {
		        // console.log(response.statusCode, body);
		        console.log("Fifth: ", new Date().getTime());
		        res.json(body);
		}
	});
});

router.post('/done', function(req, res, next) {
	console.log("Third: ", new Date().getTime());
	delay(100000);

	res.json({success: true, timestamp: new Date()});

});

module.exports = router;

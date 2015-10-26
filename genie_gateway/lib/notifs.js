var request = require('request');
var conf = require('../server_conf.js');

module.exports = {
	
	sendNotifications: function(phone, name, verification_code, callback) {
		request({
			    url: conf.notif + '/', //URL to hit , ADD API_PREFIX TO THE URL.
			    //qs: {from: 'blog example', time: +new Date()}, //Query string data
			    method: 'POST',
			    //Lets post the following key/values as form
			    json: {
			    	phone: phone,
			    	name: name,
			    	verification_code: verification_code
			    }
			}, function(error, response, body){
			    if(error) {
			        console.log(error);
			        callback({failure: error});
			    } else {
			        console.log(response.statusCode, body);
			        // Now that the user is created in database first we will send an SMS to him with the verification code
			        // And then send the token to the Android/iOS app that requested the creation of the user.

			        callback(body);
			}
		});
	}

}
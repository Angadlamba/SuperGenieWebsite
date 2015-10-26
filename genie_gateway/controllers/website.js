var request = require('request');

module.exports.controller = function(app, api_prefix, conf) {

	app.route(api_prefix + '/phonesignup')
	.all(function(req, res, next) {
		next();
	})
	/**
	 * @api {get} /users Request All Users Information
	 * @apiName GetUsers
	 * @apiGroup Users
	 *
	 *
	 * @apiSuccess {Object[]} Object List of user profiles.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     [{
	 *       "id": 1,
	 *       "phone": "8897061412"
	 *       "name": "Prabhjot Singh Lamba",
	 *       "email": "prabhjot@getgenieapp.com",
	 *       "verified": true,
	 *       "address": "124-A/196, Block No.11, Govind Nagar, Kanpur",
	 *       "image_url": "http://getgenieapp.com/images/users/1.png",
	 *       "created_at": "2015-06-01 14:55:42"
	 *     }]
	 *
	 * @apiError {json} Object There were no users found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "UsersNotFound"
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 500 Internal Server Error
	 *     {
	 *       "error": "InternalServerError"
	 *     }
	 */
	.post(function(req, res) {
		var queryData = {
			phone: req.body.phone
		};
		console.log(queryData);
		// Send email to Shephali and Chaitanya regarding
		request({
			    url: 'https://mandrillapp.com/api/1.0/messages/send.json', //URL to hit
			    //qs: {from: 'blog example', time: +new Date()}, //Query string data
			    method: 'POST',
			    json: {
				    "key": "vl6uH3MApPiKPQasHIZ7FA",
				    "message": {
				        "html": "<h3>New Subscription</h3><p>The following phone number was entered as a part of SignUp process. Please respond to this number with the process to starting ordering from SuperGenie.</p><br><b>Phone: </b> " + queryData.phone,
				        "text": "New Subscription!! The following phone number was entered as a part of SignUp process. Please respond to this number with the process to starting ordering from SuperGenie. ==> " + "Phone: " + queryData.phone,
				        "subject": "SuperGenie New Subscription",
				        "from_email": "prabhjot@getgenieapp.com",
				        "from_name": "Prabhjot",
				        "to": [
				            {
				                "email": "shephali@getgenieapp.com",
				                "name": "Shephali Shrimali",
				                "type": "to"
				            },
				            {
				            	"email": "chaitanya@getgenieapp.com",
				            	"name": "Chaitanya Pampana",
				            	"type": "to"
				            }
				        ],
				        "headers": {
				            "Reply-To": "noreply@getgenieapp.com"
				        },
				    },
			        "async": false,
				    "ip_pool": "Main Pool"
				}
			}, function(error, response, body){
			    if(error) {
			        console.log(error);
			        res.status(500).json(error);
			    } else {
			        console.log(response.statusCode, body);
			        if(response.statusCode == 200) {
			        	console.log(body);
			        	// res.json(JSON.parse(body));
			        	res.json(body);
			        } else {
			        	res.status(response.statusCode).json(body);
			        }
			}
		});
	});
	
	app.route(api_prefix + '/partnerwithus')
	.all(function(req, res, next) {
		next();
	})
	.post(function(req, res) {
		var queryData = {
			name: req.body.name,
			phone: req.body.phone,
			email: req.body.email,
			businessName: req.body.business
		};
		console.log(queryData);
		request({
			    url: 'https://mandrillapp.com/api/1.0/messages/send.json', //URL to hit
			    //qs: {from: 'blog example', time: +new Date()}, //Query string data
			    method: 'POST',
			    json: {
				    "key": "vl6uH3MApPiKPQasHIZ7FA",
				    "message": {
				        "html": "<h3>New Partner</h3><br><b>Name: </b> " + queryData.name + "<br><b>Phone: </b> " + queryData.phone + "<br><b>Email: </b> " + queryData.email + "<br><b>Business Name: </b> " + queryData.businessName + "<br>",
				        "text": "New Partner ==> " + "Name: " + queryData.name + ". Phone: " + queryData.phone + ". Email: " + queryData.email + ". Business Name: " + queryData.businessName,
				        "subject": "SuperGenie New Partner",
				        "from_email": "prabhjot@getgenieapp.com",
				        "from_name": "Prabhjot",
				        "to": [
				            {
				                "email": "harsha.reddy@getgenieapp.com",
				                "name": "Harsha Vardhan Reddy",
				                "type": "to"
				            },
				            {
				            	"email": "chaitanya@getgenieapp.com",
				            	"name": "Chaitanya Pampana",
				            	"type": "to"
				            }
				        ],
				        "headers": {
				            "Reply-To": "noreply@getgenieapp.com"
				        },
				    },
			        "async": false,
				    "ip_pool": "Main Pool"
				}
			}, function(error, response, body){
			    if(error) {
			        console.log(error);
			        res.status(500).json(error);
			    } else {
			        console.log(response.statusCode, body);
			        if(response.statusCode == 200) {
			        	console.log(body);
			        	// res.json(JSON.parse(body));
			        	res.json(body);
			        } else {
			        	res.status(response.statusCode).json(body);
			        }
			}
		});
	});


};


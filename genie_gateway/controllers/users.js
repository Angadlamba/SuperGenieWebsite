var request = require('request');
var notif = require('../lib/notifs.js');

module.exports.controller = function(app, api_prefix, conf) {

	app.route(api_prefix + '/users')
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
	.get(function(req, res) {
		Users.read('', function(data) {
			if(data.failure) {
				res.status(404).json({error: data.error});
			} else {
				res.json(data);
			}
		});
	})
	/**
	 * @api {post} /users/ Create a User
	 * @apiName PostUser
	 * @apiGroup Users
	 *
	 * @apiParam {json} Object Create a User.
	 *
	 * @apiParamExample {json} Request-Example:
     *     {
	 *       "phone": "8897061412"
	 *       "name": "Prabhjot Singh Lamba",
	 *       "device_serial_number": "AJASDJN123189ASD",
	 *       "gcm_token": "ASDNJ1238askdjn12",
	 *       "mac_id": "AKJSA1231"
     *     }
	 *
	 * @apiSuccess {json} Object Created User's Profile Information.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "id": 2,
	 *       "verification_code": 2230
	 *     }
	 *
	 * @apiError {json} Object User could not be created.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "UserNotCreated"
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 500 User Email Already Exists
	 *     {
	 *       "error": "UserPhoneAlreadyExists"
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
			name: req.body.name,
			phone: req.body.phone,
			gcm_token: req.body.gcm_token || '',
			device_serial_number: req.body.device_serial_number,
			mac_id: req.body.mac_id
		};
		request({
			    url: conf.buslogic + api_prefix + '/users', //URL to hit
			    //qs: {from: 'blog example', time: +new Date()}, //Query string data
			    method: 'POST',
			    //Lets post the following key/values as form
			    json: queryData
			}, function(error, response, body){
			    if(error) {
			        console.log(error);
			        res.json(error);
			    } else {
			        console.log(response.statusCode, body);
			        if(response.statusCode == 200) {
			        	// Now that the user is created in database first we will send an SMS to him with the verification code
				        // And then send the token to the Android/iOS app that requested the creation of the user.
			        	notif.sendNotifications(body.phone, body.name, body.verification_code, function(data) {
				        	console.log(data);
				        	if(data.failure) {
				        		res.status(500).json(data.failure);
				        	} else {
				        		res.json({token: body.token});
				        	}
				        });
			        } else {
			        	res.status(response.statusCode).json(body);
			        }
			}
		});
	});

	app.route(api_prefix + '/users/:id')
	.all(function(req, res, next) {
		next();
	})
	/**
	 * @api {get} /users/:id Request One User Information
	 * @apiName GetUser
	 * @apiGroup Users
	 *
	 *
	 * @apiSuccess {json} Object User Profile Information.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "id": 1,
	 *       "phone": "8897061412",
	 *       "name": "Prabhjot Singh Lamba",
	 *       "email": "prabhjot@getgenieapp.com",
	 *       "verified": true,
	 *       "address": "124-A/196, Block No.11, Govind Nagar, Kanpur",
	 *       "image_url": "http://getgenieapp.com/images/users/1.png",
	 *       "created_at": "2015-06-01 14:55:42"
	 *     }
	 *
	 * @apiError {json} Object User Not Found. There was no user with the given id.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "UserNotFound"
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 500 Internal Server Error
	 *     {
	 *       "error": "InternalServerError"
	 *     }
	 */
	.get(function(req, res) {
		var queryData = {};
		queryData.id = req.params.id;
		Users.readOne(queryData, function(data) {
			if(data.failure) {
				res.status(404).json({error: data.error});
			} else {
				res.json(data);
			}
		});
	})
	/**
	 * @api {put} /users/:id Update an User
	 * @apiName PutUser
	 * @apiGroup Users
	 *
	 * @apiParam {json} Object Update User's Profile.
	 * 
	 * @apiParamExample {json} Request-Example:
     *     {
     *       "name": "Prabhjot",
     *       "phone": "8897061424"
     *     }
	 *
	 * @apiSuccess {json} Object Updated User's Profile Information.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "error": null
	 *     }
	 *
	 * @apiError {json} Object User could not be updated.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "UserNotUpdated"
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 500 Internal Server Error
	 *     {
	 *       "error": "InternalServerError"
	 *     }
	 */
	.put(function(req, res) {
		var queryData = {
			id: req.params.id,
			name: req.body.name,
			phone: req.body.phone
		};
		Users.update(queryData, function(data) {
			if(data.failure) {
				res.status(404).json({error: data.error});
			} else {
				res.json(data);
			}
		});
	})
	/**
	 * @api {delete} /users/:id Delete a User
	 * @apiName DeleteUser
	 * @apiGroup Users
	 *
	 * @apiSuccess {json} Object Deleted User.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "error": null,
	 *     }
	 *
	 * @apiError {json} Object User could not be deleted.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "UserNotDeleted"
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 500 Internal Server Error
	 *     {
	 *       "error": "InternalServerError"
	 *     }
	 */
	.delete(function(req, res) {
		var queryData = {};
		queryData.id = req.params.id;

		Users.delete(queryData, function(data) {
			if(data.failure) {
				res.status(404).json({error: data.error});
			} else {
				res.json(data);
			}
		});
	});

	app.route(api_prefix + '/verifyuser')
	.all(function(req, res, next) {
		next();
	})
	.post(function(req, res) {
		var queryData = {
			verification_code: req.body.verification_code,
			token: req.headers['x-access-token']
		};
		request({
			    url: conf.buslogic + api_prefix + '/verifyuser', //URL to hit
			    //qs: {from: 'blog example', time: +new Date()}, //Query string data
			    method: 'POST',
			    //Lets post the following key/values as form
			    json: queryData
			}, function(error, response, body){
			    if(error) {
			        console.log(error);
			        res.status(404).json(error);
			    } else {
			        console.log(response.statusCode, body);
			        res.json(body);
				}
			});
	});

	app.route(api_prefix + '/isuserverified')
	.all(function(req, res, next) {
		next();
	})
	.get(function(req, res) {
		var queryData = {
			token: req.headers['x-access-token']
		};
		console.log(queryData);
		request({
			    url: conf.buslogic + api_prefix + '/isuserverified', //URL to hit
			    //qs: {from: 'blog example', time: +new Date()}, //Query string data
			    method: 'POST',
			    json: queryData
			}, function(error, response, body){
			    if(error) {
			        console.log(error);
			        res.json(error);
			    } else {
			        console.log(response.statusCode, body);
			        res.json(body);
				}
			});
	});

	app.route(api_prefix + '/updateuser')
	.all(function(req, res, next) {
		next();
	})
	.post(function(req, res) {
		var queryData = {
			token: req.headers['x-access-token'],
			name: req.body.name,
			email: req.body.email,
			address: req.body.address
		};
		request({
			    url: conf.buslogic + api_prefix + '/user', //URL to hit
			    //qs: {from: 'blog example', time: +new Date()}, //Query string data
			    method: 'PUT',
			    json: queryData
			}, function(error, response, body){
			    if(error) {
			        console.log(error);
			        res.status(404).json(error);
			    } else {
			        console.log(response.statusCode, body);
			        res.status(response.statusCode).json(body);
				}
			});
	});

	app.route(api_prefix + '/updategcm')
	.all(function(req, res, next) {
		next();
	})
	.post(function(req, res) {
		var queryData = {
			token: req.headers['x-access-token'],
			gcm_token: req.body.gcm_token
		};
		console.log(queryData);
		request({
			    url: conf.buslogic + api_prefix + '/updategcm', //URL to hit
			    //qs: {from: 'blog example', time: +new Date()}, //Query string data
			    method: 'POST',
			    json: queryData
			}, function(error, response, body){
			    if(error) {
			        console.log(error);
			        res.status(404).json(error);
			    } else {
			        console.log(response.statusCode, body);
			        res.status(response.statusCode).json(body);
				}
			});
	});

	app.route(api_prefix + '/startverification')
	.all(function(req, res, next) {
		next();
	})
	.get(function(req, res) {
		var queryData = {
			token: req.headers['x-access-token']
		};
		console.log(queryData);
		request({
			    url: conf.buslogic + api_prefix + '/startverification', //URL to hit
			    //qs: {from: 'blog example', time: +new Date()}, //Query string data
			    method: 'POST',
			    json: queryData
			}, function(error, response, body){
			    if(error) {
			        console.log(error);
			        res.json(error);
			    } else {
			        console.log(response.statusCode, body);
			        notif.sendNotifications(body.phone, body.name, body.verification_code, function(data) {
			        	console.log(data);
			        	if(data.failure) {
			        		res.status(404).json(data.failure);
			        	} else {
			        		res.json({token: queryData.token});
			        	}
			        });
				}
			});
	});

};


var request = require('request');

module.exports.controller = function(app, api_prefix, conf) {

	app.route(api_prefix + '/categories')
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
		// We will need the token in the future when we send categories specific to the user.
		var queryData = {
			token: req.headers['x-access-token']
		};
		request({
			    url: conf.buslogic + api_prefix + '/categories', //URL to hit
			    //qs: {from: 'blog example', time: +new Date()}, //Query string data
			    method: 'GET',
			    headers: {
			    	'Content-Type': 'application/json',
			    	'x-access-token': queryData.token
			    }
			}, function(error, response, body){
			    if(error) {
			        console.log(error);
			        res.json(error);
			    } else {
			        console.log(response.statusCode, body);
			        if(response.statusCode == 200) {
			        	console.log(body);
			        	res.json(JSON.parse(body));
			        	// res.json(body);
			        } else {
			        	res.status(response.statusCode).json(JSON.parse(body));
			        }
			}
		});
	})
	.post(function(req, res) {
		var queryData = {
			name: req.body.name,
			description: req.body.description,
			image_url: req.body.image_url,
			bg_color: req.body.bg_color,
			hide_chats_time: req.body.hide_chats_time
		};
		request({
			    url: conf.buslogic + api_prefix + '/categories', //URL to hit
			    //qs: {from: 'blog example', time: +new Date()}, //Query string data
			    method: 'POST',
			    json: queryData
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
	
	app.route(api_prefix + '/categories/:id')
	.all(function(req, res, next) {
		next();
	})
	.delete(function(req, res) {
		var queryData = {
			id: req.params.id
		};

		request({
			    url: conf.buslogic + api_prefix + '/categories/' + queryData.id, //URL to hit
			    //qs: {from: 'blog example', time: +new Date()}, //Query string data
			    method: 'DELETE'
			}, function(error, response, body){
			    if(error) {
			        console.log(error);
			        res.status(500).json(error);
			    } else {
			        console.log(response.statusCode, body);
			        if(response.statusCode == 200) {
			        	console.log(body);
			        	res.json(JSON.parse(body));
			        	// res.json(body);
			        } else {
			        	res.status(response.statusCode).json(body);
			        }
			}
		});
	});


};


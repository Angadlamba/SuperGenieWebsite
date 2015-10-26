

module.exports.controller = function(app, api_prefix) {

	app.route(api_prefix + '/categories')
	.all(function(req, res, next) {
		next();
	})
	/**
	 * @api {get} /categories Request All Categories Information
	 * @apiName GetCategories
	 * @apiGroup Categories
	 *
	 *
	 * @apiSuccess {Object[]} Object List of category profiles.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     [{
	 *       "id": 1,
	 *       "name": "Travel",
	 *       "image_url": "http://getgenieapp.com/images/categories/travel.png",
	 *       "notification_count": 3,
	 *       "description": "Book Flight, Train, Bus Tickets.",
	 *       "bg_color": "#ff0000",
	 *       "hide_chats_time": 86400000
	 *     }]
	 *
	 * @apiError {json} Object There were no categories found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "CategoriesNotFound"
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 500 Internal Server Error
	 *     {
	 *       "error": "InternalServerError"
	 *     }
	 */
	.get(function(req, res) {
		Categories.read('', function(data) {
			if(data.failure) {
				res.status(404).json({error: data.error});
			} else {
				res.json(data);
			}
		});
	})
	/**
	 * @api {post} /categories/ Create a Category
	 * @apiName PostCategory
	 * @apiGroup Categories
	 *
	 * @apiParam {json} Object Create an Category.
	 *
	 * @apiParamExample {json} Request-Example:
     *     {
     *       "name": "Travel",
     *       "description": "Book Flight, Train, Bus Tickets.",
     *       "image_url": "http://getgenieapp.com/images/categories/travel.png",
     *       "bg_color": "#ff0000",
     *       "hide_chats_time": 86400000
     *     }
	 *
	 * @apiSuccess {json} Object Created Category's Information.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "id": 5
	 *     }
	 *
	 * @apiError {json} Object Category could not be created.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "CategoryNotCreated"
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 500 Category Name Already Exists
	 *     {
	 *       "error": "CategoryNameAlreadyExists"
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
			description: req.body.description,
			image_url: req.body.image_url,
			bg_color: req.body.bg_color,
			hide_chats_time: req.body.hide_chats_time
		};
		Categories.create(queryData, function(data) {
			if(data.failure) {
				res.status(404).json({error: data.error});
			} else {
				res.json(data);
			}
		});
	});

	app.route(api_prefix + '/categories/:id')
	.all(function(req, res, next) {
		next();
	})
	/**
	 * @api {get} /categories/:id Request One Category Information
	 * @apiName GetCategory
	 * @apiGroup Categories
	 *
	 *
	 * @apiSuccess {json} Object Category Profile Information.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "id": 1,
	 *       "name": "Travel",
	 *       "image_url": "http://getgenieapp.com/images/categories/travel.png",
	 *       "notification_count": 3,
	 *       "description": "Book Flight, Train, Bus Tickets.",
	 *       "bg_color": "#ff0000",
	 *       "hide_chats_time": 86400000
	 *     }
	 *
	 * @apiError {json} Object Category Not Found. There was no category with the given id.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "CategoryNotFound"
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
		Categories.readOne(queryData, function(data) {
			if(data.failure) {
				res.status(404).json({error: data.error});
			} else {
				res.json(data);
			}
		});
	})
	/**
	 * @api {put} /categories/:id Update a Category
	 * @apiName PutCategory
	 * @apiGroup Categories
	 *
	 * @apiParam {json} Object Update Category.
	 * 
	 * @apiParamExample {json} Request-Example:
     *     {
     *       "name": "Travel",
     *       "description": "Book Flight, Train, Bus Tickets.",
     *       "image_url": "http://getgenieapp.com/images/categories/travel.png",
     *       "bg_color": "#ff0000",
     *       "hide_chats_time": 86400000
     *     }
	 *
	 * @apiSuccess {json} Object Updated Category's Information.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "error": null
	 *     }
	 *
	 * @apiError {json} Object Category could not be updated.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "CategoryNotUpdated"
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
			description: req.body.description,
			image_url: req.body.image_url,
			bg_color: req.body.bg_color,
			hide_chats_time: req.body.hide_chats_time
		};
		Categories.update(queryData, function(data) {
			if(data.failure) {
				res.status(404).json({error: data.error});
			} else {
				res.json(data);
			}
		});
	})
	/**
	 * @api {delete} /categories/:id Delete a Category
	 * @apiName DeleteCategory
	 * @apiGroup Categories
	 *
	 * @apiSuccess {json} Object Deleted Category.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "error": null,
	 *     }
	 *
	 * @apiError {json} Object Category could not be deleted.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "CategoryNotDeleted"
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

		Categories.delete(queryData, function(data) {
			if(data.failure) {
				res.status(404).json({error: data.error});
			} else {
				res.json(data);
			}
		});
	});

};



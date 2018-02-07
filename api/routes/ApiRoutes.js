'use strict';
module.exports = function(app) {
  	var CurrencyApi = require('../controllers/ApiController');

	app.use(function(req, res, next) {
	  	// Website you wish to allow to connect
	 	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8008');
	  	// Request methods you wish to allow
	  	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	  	// Request headers you wish to allow
	  	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	  	// Set to true if you need the website to include cookies in the requests sent
	  	// to the API (e.g. in case you use sessions)
	  	res.setHeader('Access-Control-Allow-Credentials', true);
		next();
	});

  	app.route('/pairs/:pair_id')
    	.get(CurrencyApi.read_a_pair)

  	app.route('/pairs')
    	.get(CurrencyApi.read_all_pairs)
};

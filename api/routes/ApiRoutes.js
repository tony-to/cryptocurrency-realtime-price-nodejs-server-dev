'use strict';
module.exports = function(app) {
  var CurrencyApi = require('../controllers/ApiController');

  app.route('/pairs/:pair_id')
    .get(CurrencyApi.read_a_pair)
};

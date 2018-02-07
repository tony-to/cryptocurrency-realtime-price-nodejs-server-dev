'use strict';

var model = require('../models/ApiModel')

exports.read_a_pair = function(req, res) {

  var pair_id = req.params.pair_id;

  //Use test data to return
  // var pair_object = model.findById(pair_id);
  model.findById(pair_id, function(result) {
    console.log("controller result");
    if(result){
      res.json(result);
    }else{
      res.status(404).send('Not found');
    }
  });

  
};

exports.read_all_pairs = function(req, res){

  var pairs = model.getAvailablePair();
  var results = [];
  var count = pairs.length;
  pairs.map(function (pair,i) {
    model.findById(pair.id, function(result) {
      console.log("controller result");
      if(result){
        results.push(result);
      }
      if(pairs.length == (i+1)){
        console.log("return result");
        if(results.length){
          res.json(results);
        }else{
          res.status(404).send('Not found');
        }
      }
    });
  });

}

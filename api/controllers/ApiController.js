'use strict';
const CALL_API = false;
const API_URL = "https://api.cryptonator.com/api/ticker/";
var model = require('../models/ApiModel')

exports.read_a_pair = function(req, res) {

  var axios = require('axios')
  var pair_id = req.params.pair_id;

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8008');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  if(CALL_API){
    axios.get(API_URL+pair_id, {
        responseType: 'json'
    }).then(response => {
      if(response.data.success){
        res.json(response.data.ticker);
      }else{
        res.json({"base":"-","target":"-","price":"-","volume":"-","change":"-"});
      }
    }).catch(function (error) {
      console.log(error);
    });
  }else{
    //Use test data to return
    var pair_object = model.findById(pair_id);

    console.log(pair_object.name);
    if(pair_object){
      res.json(pair_object);
    }else{
      res.json({"base":"-","target":"-","price":"-","volume":"-","change":"-"});
    }
  }
};

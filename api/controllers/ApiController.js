'use strict';
const CALL_API = false;
const API_URL = "https://api.cryptonator.com/api/ticker/";

//For Testing
const test_data = [
    {"id":"btc-usd" ,"name":"Bitcoin","base":"BTC","target":"USD","price":"8477.42028862","volume":"92916.88297066","change":"44.09777279"},
    {"id":"eth-usd" ,"name":"Ether","base":"ETH","target":"USD","price":"876.51060450","volume":"310480.13154134","change":"14.15302330"},
    {"id":"ltc-usd" ,"name":"Litecoin","base":"LTC","target":"USD","price":"152.39716697","volume":"1031874.98751268","change":"1.12432456"},
    {"id":"xmr-usd" ,"name":"Monero","base":"XMR","target":"USD","price":"221.12713565","volume":"52618.16494258","change":"2.10359105"},
    {"id":"xrp-usd" ,"name":"Ripple","base":"XRP","target":"USD","price":"0.83239443","volume":"190525567.50193000","change":"0.01127935"},
    {"id":"doge-usd","name":"Dogecoin","base":"DOGE","target":"USD","price":"0.00446731","volume":"169185147.28885001","change":"0.00003487"},
    {"id":"dash-usd","name":"Dash","base":"DASH","target":"USD","price":"555.20835131","volume":"21771.57603766","change":"4.67114421"},
    {"id":"maid-usd","name":"MaidSafeeCoin","base":"MAID","target":"USD","price":"0.38887560","volume":"","change":"0.00273993"},
    {"id":"lsk-usd" ,"name":"Lisk","base":"LSK","target":"USD","price":"20.17610000","volume":"1511.00000000","change":"0.00000000"},
    {"id":"sjcx-usd","name":"Storjcoin X","base":"","target":"","price":"","volume":"","change":""}
];

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
    var pair_object = test_data.find(item => item.id === pair_id);
    console.log(pair_object.name);
    if(pair_object){
      res.json(pair_object);
    }else{
      res.json({"base":"-","target":"-","price":"-","volume":"-","change":"-"});
    }
  }
};

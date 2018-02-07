const CALL_API = false;
const API_URL = "https://api.cryptonator.com/api/ticker/";

//For Testing
const test_data = [
    {"id":"btc-usd","base":"BTC","target":"USD","price":"8477.42028862","volume":"92916.88297066","change":"44.09777279"},
    {"id":"eth-usd","base":"ETH","target":"USD","price":"876.51060450","volume":"310480.13154134","change":"14.15302330"},
    {"id":"ltc-usd","base":"LTC","target":"USD","price":"152.39716697","volume":"1031874.98751268","change":"1.12432456"},
    {"id":"xmr-usd","base":"XMR","target":"USD","price":"221.12713565","volume":"52618.16494258","change":"2.10359105"},
    {"id":"xrp-usd","base":"XRP","target":"USD","price":"0.83239443","volume":"190525567.50193000","change":"0.01127935"},
    {"id":"doge-usd","base":"DOGE","target":"USD","price":"0.00446731","volume":"169185147.28885001","change":"0.00003487"},
    {"id":"dash-usd","base":"DASH","target":"USD","price":"555.20835131","volume":"21771.57603766","change":"4.67114421"},
    {"id":"maid-usd","base":"MAID","target":"USD","price":"0.38887560","volume":"","change":"0.00273993"},
    {"id":"lsk-usd" ,"base":"LSK","target":"USD","price":"20.17610000","volume":"1511.00000000","change":"0.00000000"},
    {"id":"sjcx-usd","base":"","target":"","price":"","volume":"","change":""}
];

//Simulate DB
const test_available_pair = [
  {"name":"Bitcoin","id":"btc-usd"},
  {"name":"Ether","id":"eth-usd"},
  {"name":"Litecoin","id":"ltc-usd"},
  {"name":"Monero","id":"xmr-usd"},
  {"name":"Ripple","id":"xrp-usd"},
  {"name":"Dogecoin","id":"doge-usd"},
  {"name":"Dash","id":"dash-usd"},
  {"name":"MaidSafeeCoin","id":"maid-usd"},
  {"name":"Lisk","id":"lsk-usd"},
  {"name":"Storjcoin X","id":"sjcx-usd"}
]

var Pair = function (data) {
	this.data = data;
}

Pair.prototype.data = {"id":"","name":"","base":"","target":"","price":"","volume":"","change":""}

//Test function for stored the pair id in db
Pair.getAvailablePair = function (){
	return test_available_pair;
}

//Test function for call api to get content
Pair.findById = function (id, callback) {
	//Check pair id exist in db
	var test_available_pair = this.getAvailablePair();
	var pair = test_available_pair.find(item => item.id === id);
	if(pair){
		if(CALL_API){
  			var axios = require('axios')
		    axios.get(API_URL+pair.id, {
		        responseType: 'json'
		    }).then(response => {
				if(response.data.success){
					console.log("api result");
					console.log(response.data);
					var result =  response.data.ticker;
					result.id = pair.id;
					result.name = pair.name;
					// return result;
					callback(result);
				}else{
					// return false;
					callback(false);
				}
		    }).catch(function (error) {
		    	console.log(error);
		    	callback(false);
		    });
	  	}else{
	  		var result = test_data.find(item => item.id === pair.id);
	  		console.log("api result");
			result.name = pair.name;
			// return result;
			callback(result);
	  	}
	}else{
	  	// return false;
	  	callback(false);
	}
}

module.exports = Pair;
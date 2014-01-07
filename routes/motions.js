//motions.js
var mongoose = require('mongoose');
var Motion = mongoose.model( 'Motion' );

module.exports = {

	get : function (req, res) {
		//
	},
	put : function (req, res) {
		//Hopefully, the browser will pass a JSON object to the server and we can simply parse it...
		new Motion ()
	},
	post : function (req, res) {
		//
	},
	delete : function (req, res) {
		//
	}
};
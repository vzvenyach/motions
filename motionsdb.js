var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Motion = new Schema ({
	date:String,
	meeting:String,
	motion_number:Number,
	measure_type:String,
	measure_number:String,
	short_title:String,
	movant:String,
	motion_description:String,
	required_threshold:Number,
	description:String,
	discussion:[{member:String}]
	friendly: Boolean
	roll_call:Boolean,
	votes:[{member:String, vote:String}],
	passed:String,
	updated_at:Date
})

mongoose.model( 'Motion', Motion );
mongoose.connect( 'mongodb://localhost/motionsdb' );
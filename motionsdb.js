var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var motionSchema = new Schema ({
	date:String,
	meeting:String,
	motion_number:Number,
	_id: String,
	parent_id:String,
	measure_type:String,
	measure_number:String,
	short_title:String,
	movant:String,
	motion_description:String,
	required_threshold:Number,
	description:String,
	discussion:Array,
	friendly: Boolean,
	roll_call:Boolean,
	votes:Array,
	passed:String,
	updated_at:Date
});
var Motion = mongoose.model( 'Motion', motionSchema )
module.exports = Motion;
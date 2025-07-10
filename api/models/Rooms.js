const { default: mongoose } = require('mongoose');
const { Schema } = mongoose;

const RoomsSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	title: { type: String, required: true },
	city: { type: String, required: true },
	address: { type: String, required: true },
	rooms: { type: Number, required: true },
	type: { type: String, required: true },
	images: { type: [String], required: true },
	description: { type: String, required: true },
	perks: { type: [String], required: true },
	checkIn: { type: String, required: true },
	checkOut: { type: String, required: true },
	maxGuests: { type: Number, required: true },
	price: { type: Number, required: true },
});

const RoomsModel = mongoose.model('Rooms', RoomsSchema);

module.exports = RoomsModel;

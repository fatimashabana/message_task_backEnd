const mongoose = require('mongoose');
const validator = require('validator');

const messageSchema = new mongoose.Schema({

	from: {
		type: String,
		required: true,
		validate: (v) => validator.isEmail(v),
	},
	to: {
		type: String,
		required: true,
		validate: (v) => validator.isEmail(v),
	},
	text: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
		// default: Date.now
	},
});

const messageModel = mongoose.model('Message', messageSchema)

module.exports = messageModel;

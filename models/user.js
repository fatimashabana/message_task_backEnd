const mongoose = require('mongoose');
const validator = require('validator');
var integerValidator = require('mongoose-integer');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const util = require('util');


const secretKey = "mnbvhjhgfgh";
const saltRounds = 7;

const signPromise = util.promisify(jwt.sign);
const verifyToken = util.promisify(jwt.verify);

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 10,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		integer: true,
		required: true,
		min: 18
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: (v) => validator.isEmail(v),
	},
	gender: {
		type: String,
		enum: ['male', 'female', 'n/a'],
		default: 'n/a',
		lowercase: true,
	},
	country: {
		type: String,
		required: true,
		enum: ['Eg', 'Uk'],
		maxlength: 15
	}

}, {
		toJSON: {
			trasform: function (res, ret, options) {
				delete ret.password;
				return ret;
			}
		}
	});
userSchema.plugin(integerValidator);

const hashPassword = (password) => bcrypt.hash(password, saltRounds);

userSchema.pre('save', async function () {
	const currentUser = this;
	if (currentUser.isNew) {
		currentUser.password = await hashPassword(currentUser.password);
	}
});

userSchema.method("verifyPassword", function (password) {
	const currentuser = this;
	return bcrypt.compare(password, currentuser.password);
})

userSchema.static("verifyToken", async function (token) {
	const userModel = this;
	return decoded = await verifyToken(token, secretKey);
	const id = decoded._id;
	return userModel.findById(id);
})

userSchema.method("generateToken", function () {
	const currentuser = this;
	return signPromise({ _id: currentuser._id }, secretKey);
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;
9
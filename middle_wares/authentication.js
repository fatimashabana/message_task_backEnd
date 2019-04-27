
var createError = require('http-errors');
const userModel = require("../models/user");

module.exports = async (req, res, next) => {
	try {
		//check if user sent atoken
		debugger;
		if (!req.headers.authorization) return next(createError(401, err.message))
		//bearer token
		//check if token is valid
		debugger;
		const token = req.headers.authorization.split(" ")[1];
		const user = await userModel.verifyToken(token);
		//retrieve user
		if (!user) next(createError(401, err.message));
		//attach currentuser to req
		req.user = user
		//call next
		next();

	}
	catch (err) {
		next(createError(401))
	}
}    
var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const Message = require('../models/message')

/* GET messages listing. */
router.get('/', async (req, res, next) => {
	try {
		const users = await User.find({}).exec();
		res.send(users)
		// res.render('listUser', { users });
	} catch (err) {
		next(createError(500, err.message));
	}
});

/*Insert user*/
router.post('/create', (req, res, next) => {
	User.create(req.body)
		.then(user => {
			res.send(user);
			// res.redirect("/api/users");
		})
		.catch(err => {
			// res.send(" insert fail");
			next(createError(400, err.message));
		})
})
/* GET user details */
router.get('/:id', (req, res, next) => {
	User
		.findById(req.params.id)
		.exec()
		.then(user => { res.send(user); })
		.catch(err => { next(createError(500, err.message)); })
});
/* update user  */
router.patch('/:id', (req, res, next) => {
	User
		.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.exec()
		.then(user => { res.send(user); })
		.catch(err => { next(createError(400, err.message)); })
});
/* delete user  */
router.delete('/:id', (req, res, next) => {
	User
		.findByIdAndDelete(req.params.id)
		.exec()
		.then(user => { res.send(user); })
		.catch(err => { next(createError(400, err.message)); })
});


module.exports = router;

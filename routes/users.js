var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const User = require('./../models/user');
const authmiddleware = require('./../middle_wares/authentication')




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
/*  user Login */
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const currentUser = await User.findOne({ username });

  if (!currentUser) return next(createError(404, err.message));
  const isMatchedPassword = await currentUser.verifyPassword(password);

  if (!isMatchedPassword) return next(createError(404, err.message));
  const token = await currentUser.generateToken();

  res.send({
    profile: currentUser,
    token
  });
});

/////////////////////////////////////////////
// router.use(authmiddleware);
/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).exec();
    res.send(users)
    // res.render('listUser', { users });
  } catch (err) {
    next(createError(500, err.message));
  }
});
/* GET user details */
router.get('/:id', (req, res, next) => {
  User
    .findById(req.params.id)
    .exec()
    .then(user => { res.send(user); })
    .catch(err => { next(createError(404, err.message)); })
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


const router = require('express').Router()
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async function (req, res) {
  //VALIDATE REQUEST DATA
  const error = registerValidation(req.body)
  //console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the user is already in the database
  const isEmailExist = await User.findOne({ email: req.body.email })
  if (isEmailExist) return res.status(400).send("email already exist")

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt)


  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  })
  try {
    const savedUser = await user.save()
    res.json({ id: savedUser._id })
  }
  catch (err) {
    console.log(err);
    res.status(400).send(err)
  }

})

router.post('/login', async (req, res) => {
  //VALIDATE REQUEST DATA
  const error = loginValidation(req.body)
  //console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the user in the database
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send("user doesn't exist")
  //PASSWORD MATCHING
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send("invalid password")
  //creating jwt token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  res.header('auth-token', token)
  res.send("Loged In")
})

module.exports = router;
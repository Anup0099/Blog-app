const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10); //comparing the password with the hash password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    }); //save the user to the database

    const user = await newUser.save(); //return the user
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  } // if the user already exists, return error message
});
// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    } //if   user not found  return error message  and status code 400 (bad request)   400 is bad request  401 is unauthorized 403 is forbidden  404 is not found  500 is internal server error  and 501 is not implemented
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    ); //comparing the password entered with the password in the database
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    } //if password is incorrect return error
    const { password, ...others } = user._doc; //remove the password from the user object
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  } //catch error
});
module.exports = router;

const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
//update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10); //comparing the password with the hash password
      req.body.password = await bcrypt.hash(req.body.password, salt);//   const salt = await bcrypt.genSalt(10); //comparing the password with the hash password  const hashedPassword = await bcrypt.hash(req.body.password, salt);  
    }

    try {
      const UpdatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      },{new:true}); 
      
      //comparing  the password with the hash password and updating the user in the database with the new password     $set: req.body is a mongoose update operator.  It is used to update the document.

      res.status(200).json(UpdatedUser);//return the user updated in the database and status code 200 (ok)  and json format of the user updated in the database.
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ message: "you can only update your own account" });
  }
});
//Delete
router.delete("/:id", async (req, res) => {
 if (req.params.id === req.body.userId)//if the user id in the url is the same as the user id in the body, then delete the user from the database.  If not, return error message and status code 400 (bad request)
 {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);//  const deletedUser = await User.findByIdAndDelete(req.params.id); delete the user from the database  and return the user deleted from the database  
      res.status(200).json(deletedUser);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ message: "you can only delete your own account" });
  }
});
module.exports = router;

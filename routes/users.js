const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Post = require("../models/Post");
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
      
      //comparing  the password with the hash password and updating the user in the database with the new password     $set: req.body is a mongoose update operator.  It is used to update the document.    new:true is a mongoose option. It is used to return the updated document.

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
   try{
      const user = await User.findById(req.params.id);//find the user in the database by the id in the url.
     try {
       await Post.deleteMany({username: user.username});//delete all the posts of the user.
        await User.findByIdAndDelete(req.params.id);//  const deletedUser = await User.findByIdAndDelete(req.params.id); delete the user from the database  and return the user deleted from the database  
       res.status(200).json("user has been deleted"); //return the user deleted from the database and status code 200 (ok)  and json format of the user deleted from the database.;
     } catch (err) {
       res.status(500).json({ message: "Internal Server Error" });
     }
   }catch (err){
     res.status(404).json({ message: "user not found" });
   }
  } else {
    res.status(400).json({ message: "you can only delete your own account" });
  }
});


//Get all users

router.get("/", async (req, res) => {
  try {
    const users = await User.findById(req.params.id);//find all the users in the database.
    const {password,...others} = users._doc;//remove the password from the user object. others is the user object without the password. _doc is a mongoose method. It is used to return the document.
    res.status(200).json(others);//return the users and status code 200 (ok)  and json format of the users.
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }

})

module.exports = router;

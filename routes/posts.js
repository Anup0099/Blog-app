const router = require("express").Router();// router is an express router.  It is used to define the routes for the application.  The router is an instance of the express.Router class.  The express.Router class is a function that returns a new router object.

const User = require("../models/User");// User is a mongoose model.  It is used to define the structure of the documents in the collection.

const Post = require("../models/Post");// Post is a mongoose model.  It is used to define the structure of the documents in the collection.
//create a new post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body); //create a new post object with the body of the request. The new post object is the body of the request.

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost); //return the post saved in the database and status code 200 (ok)  and json format of the post saved in the database.
  } catch (err) {
    res.status(400).json({ message: "you can only create your own post" });
  }
});
//update post
router.put("/:id", async (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          }, //  $set:req.body,  //update the post with the new body of the request  and the id of the post  and the new body of the request   //the id of the post is in the params of the request
          { new: true } //return the updated post and the new post  //new:true return the updated post
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("you can only update your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("post has been deleted");
      } catch (err) {
        //if the post is found and the username is the same as the username of the post, then delete the post.  If the post is not found, then return a status code of 404 (not found) and a message of "post not found".
        res.status(500).json(err);
      }
    } //if the post is not found in the database return a status code 404 (not found) and a json message.
    else {
      res.status(401).json("you can only delete your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findById(req.params.id); //find all the users in the database.
    const { password, ...others } = users._doc; //remove the password from the user object. others is the user object without the password. _doc is a mongoose method. It is used to return the document.
    res.status(200).json(others); //return the users and status code 200 (ok)  and json format of the users.
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

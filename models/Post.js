const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      required: false,
    },
  }//end of PostSchema    PostSchema is a mongoose schema.  It is used to define the structure of the documents in the collection.
  
  ,

  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);

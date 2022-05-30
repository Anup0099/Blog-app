const express = require("express");
const app = express();
const dotenv = require("dotenv"); //import dotenv package
const mongoose = require("mongoose"); //import mongoose library
const authRoute = require("./routes/auth");// load  the routes  file  for auth  routes  and  export it  to  use it in the app.use() method  below.  .use() is a method of express.Router()  class.  It is used to mount middleware handlers to a specified path.
const UserRoute = require("./routes/users");// load  the routes  file  for users  routes  and  export it  to  use it in the app.use() method  below.  .use() is a method of express.Router()  class.  It is used to mount middleware handlers to a specified path.  
dotenv.config();// load .env file into process.env object (dotenv is a module)  and then use it to get the values of the variables  in the .env file 
app.use(express.json());// load the middleware to parse the json data from the request body and make it available in the request object.
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })  //connect to the database   using mongoose.connect() method.  The first argument is the url of the database.  The second argument is an object that contains options for the connection.  The options are: useNewUrlParser, useUnifiedTopology, useCreateIndex.  The useCreateIndex option is used to create indexes on the collections.  The default value is false. The useNewUrlParser option is used to parse the url of the database.  The default value is false.  The useUnifiedTopology option is used to connect to the database using the new topology.  The default value is false.
  .then(console.log("DB Connected"))
  .catch((err) => console.log(err));
app.use("/api/auth", authRoute);  //mount the auth routes to the /api/auth path.    .use() is a method of express.Router()  class.  It is used to mount middleware handlers to a specified path.
app.use("/api/users", UserRoute);  //mount the users routes to the /api/users path.    .use() is a method of express.Router()  class.  It is used to mount middleware handlers to a specified path.
app.listen("5000", () => {
  console.log("Server started on port 5000");
});   //start the server on port 5000.  The callback function is called when the server is started.

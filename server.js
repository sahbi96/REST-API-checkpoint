const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5000;

//user model
const User = require("./models/User");

//configure .env
require("dotenv").config({ path: "./config/.env" });
const mongoURI =
  "mongodb+srv://sahbi96:mongo123@cluster0.i4cw2.mongodb.net/people1?retryWrites=true&w=majority";

//connect to mongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
(err) => (err ? console.log("error", err) : console.log("Connected"));

app.use(express.json());
// app.use('/api',require('./models/User'))

//add new user

app.post("/add", (req, res) => {
  const { firstName, lastName, emailAddress } = req.body;
  let newUser = new User({ firstName, lastName, emailAddress });
  newUser
    .save()
    .then(() => res.json({ msg: "User added " }))
    .catch((err) => console.log(err));
});
//edit user by id
app.put("/edit/:id", (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    (err, data) => {
      err ? console.log(err) : res.json({ msg: "user was updated" });
    }
  );
});
// delete user by id
app.delete("/delete/:id", (req, res) => {
  User.findByIdAndDelete(
    { _id: req.params.id },
    { ...req.body },
    (err, data) => {
      err ? console.log(err) : res.json({ msg: "user was deleted" });
    }
  );
});

//listen to port
app.listen(port, (err) => {
  err
    ? console.log("server is not running", err)
    : console.log("server is running on port 5000");
});

const mongoose = require("mongoose");


// 2. Replace <db_password> with your actual password
mongoose.connect("mongodb+srv://vishnu_priya_475:vishnu475540@cluster0.nzdaaxb.mongodb.net/todo")
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error("Could not connect to MongoDB", err));

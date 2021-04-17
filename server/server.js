const express = require("./node_modules/express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const app = express();

//*****CONFIGURATION
//dotenv
dotenv.config({ path: "./config/config.env" });
//database
connectDB();
//passport
require("./config/passport.js")(passport);

//*****MIDDLEWARE
//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Session
app.use(
  session({
    secret: "7781",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/blogs", require("./routes/blogs"));
app.use("/users", require("./routes/users"));

//*****PORT
const PORT = process.env.PORT || 7781;
app.listen(PORT, () => {
  console.log(`Server Connected on ${PORT}`);
});

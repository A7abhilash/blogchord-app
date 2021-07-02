const express = require("./node_modules/express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

//*****CONFIGURATION
//dotenv
dotenv.config({ path: "./config/config.env" });
//database
connectDB();

//*****MIDDLEWARE
//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Routes
app.use("/", require("./routes/index"));
app.use("/blogs", require("./routes/blogs"));
app.use("/users", require("./routes/users"));

//*****PORT
const PORT = process.env.PORT || 7781;
app.listen(PORT, () => {
  console.log(`Server Connected on ${PORT}`);
});

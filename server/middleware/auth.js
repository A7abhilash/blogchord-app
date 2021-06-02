const axios = require("axios");
const Users = require("../models/Users");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in!!!" });
  }

  try {
    console.log("Auth: ", authorization);
    let config = {
      method: "get",
      url: "https://www.googleapis.com/userinfo/v2/me",
      headers: {
        Authorization: authorization,
      },
    };

    const result = await axios(config);
    console.log(result.data);
    const { id } = result.data;
    const user = await Users.findOne({ googleId: id });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

const jwt = require("jsonwebtoken");
const User = require("../modals/User");

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log("token--", token);
    if (!token) {
      // return errorResponseWithoutData(res, "Unauthorized access");
    }
    token = token.split(" ")[1];
    await jwt.verify(token, process.env.JWT_SECRET, async function (err) {
      if (err) {
        return res;
      } else {
        req.user = await User.findOne({ token: token });
        console.log(" req.user 2 --------------> ", req.user);
      }
      next();
    });
  } catch (error) {
    console.log("error in middleware", error);
  }
};

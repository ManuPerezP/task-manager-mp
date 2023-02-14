const jwt = require("jsonwebtoken");
const User = require("../model/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error('No user found');
    }
    req.token = token
    req.user = user;
    next();
  } catch (e) {
    console.log("e=====>", e.message);
    // res.status(401).send({ error: e.message});
    res.status(401).send({ error: 'Please authenticate.' })
  }
  //   console.log("from auth middleware");
  //      next();
};

module.exports = auth;

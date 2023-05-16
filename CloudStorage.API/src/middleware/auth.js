const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const userAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({
      _id: data._id,
      'tokens.token': token,
    });
    if (!user) return res.status(404).send({ Message: 'No user found.' });
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(403).send({ Message: 'No authentication.' });
  }
};

module.exports = userAuth;

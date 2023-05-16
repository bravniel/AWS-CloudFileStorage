const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate(name) {
      if (name.length < 2) {
        throw new Error('Name is too short');
      }
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    unique: true,
    validate(email) {
      if (!validator.isEmail(email)) {
        throw new Error('Invalid email');
      }
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    validate(password) {
      if (password.length < 6) {
        throw new Error('Password is too short');
      }
    },
  },
  images: [
    {
      image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.statics.findUserbyEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable to login, user not found');
  }
  const isPassMatch = await bcrypt.compare(password, user.password);
  if (!isPassMatch) {
    throw new Error('Unable to login, password does not match to user');
  }
  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: '6h',
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  return userObj;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

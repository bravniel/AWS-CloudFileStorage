const Image = require("../models/imageModel");
const User = require("../models/userModel");
const { Readable } = require('stream');

exports.register = async (req, res) => {
  const info = req.body;
  try {
    const user = new User(info);
    if (!info.name) return res.status(400).send({ Error: 'Name required' });
    if (!info.email) return res.status(400).send({ Error: 'Email required' });
    if (!info.password)
      return res.status(400).send({ Error: 'Password required' });
    const duplicateUser = await User.findOne({ email: info.email });
    if (duplicateUser)
      return res
        .status(400)
        .send({ Error: 'Email exists in the system, Email is unique' });
    await user.save();
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
};

exports.login = async (req, res) => {
  const loginInfo = req.body;
  try {
    if (!loginInfo.email)
      return res.status(400).send({ Error: 'Email required' });
    if (!loginInfo.password)
      return res.status(400).send({ Error: 'Password required' });
    const user = await User.findUserbyEmailAndPassword(
      loginInfo.email,
      loginInfo.password
    );
    const token = await user.generateAuthToken();
    res.send({ token, user });
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
};

exports.logout = async (req, res) => {
  const user = req.user;
  try {
    user.tokens = user.tokens.filter(
      (tokenDoc) => tokenDoc.token !== req.token
    );
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
};

// -------------------------------------------------------------------------------

exports.uploadAndAddImageToUser = async (req, res) => {
  console.log(req.file);
  if (!req.file) {
    res.status(422).send({
      code: 422,
      message: 'File not uploaded',
    });
  }
  const image = new Image({
    originalName: req.file.originalname,
    storageName: req.file.key.split('/')[1],
    bucket: process.env.S3_BUCKET,
    region: process.env.AWS_REGION,
    key: req.file.key,
  });
  req.user.images = req.user.images.concat({ image });
  try {
    await image.save();
    await req.user.save();
    res.send(image);
  } catch (err) {
    console.log(err);
    if (!err.status) err.status = 500;
    res.status(err.status).send({ Message: 'Server Error. ' + err });
  }
};

exports.getAllUserImages = async (req, res) => {
  try {
    const populatedUser = await req.user
      .populate('images.image');
    const userImages = populatedUser.images;
    res.send(userImages);
  } catch (err) {
    console.log(err);
    if (!err.status) err.status = 500;
    res.status(err.status).send({ Message: 'Server Error. ' + err });
  }
};

exports.getUserImage = async (req, res) => {
  try {
    const imageName = req.query.name;
    const stream = Readable.from(req.imageBuffer);
    res.setHeader('Content-Disposition', 'inline; filename=' + imageName);
    stream.pipe(res);
  } catch (err) {
    console.log(err);
    if (!err.status) err.status = 500;
    res.status(err.status).send({ Message: 'Server Error. ' + err });
  }
};

exports.deleteImageFromUser = async (req, res) => {
  const id = req.body.id;
  try {
    const imageObj = await Image.findByIdAndDelete(id);
    if (!imageObj) {
      res.status(404).send({
        status: 404,
        message: 'Image not found.',
      });
    }
    req.user.images = req.user.images.filter((image) => image.image !== id);
    await req.user.save();
    res.send(imageObj);
  } catch (err) {
    console.log(err);
    if (!err.status) err.status = 500;
    res.status(err.status).send({ Message: 'Server Error. ' + err });
  }
};

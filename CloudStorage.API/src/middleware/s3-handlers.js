const AWS = require('aws-sdk');
//const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

// const s3 = new AWS.S3({ region: process.env.AWS_REGION });

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

const bucket = process.env.S3_BUCKET;

const fileStorage = multerS3({
  s3, // לאיזה s3 מתחבר
  acl: 'private', // 'public-read', // רמת גישה לקבצים
  contentType: multerS3.AUTO_CONTENT_TYPE,
  contentDisposition: 'inline', // איך הקבצים ירדו
  bucket,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName = `${req.user._id}/${new Date().getTime()}-${
      file.originalname
    }`;
    cb(null, fileName);
  },
});

const uploadImageToS3 = multer({ storage: fileStorage }).single('image');

const getImageFromS3 = async (req, res, next) => {
  const Key = req.query.key;
  try {
    const { Body } = await s3
      .getObject({
        Key,
        Bucket: bucket,
      })
      .promise();
    req.imageBuffer = Body;
    next();
  } catch (err) {
    console.log(err);
  }
};

const deleteImageFromS3 = async (req, res, next) => {
  const Key = req.body.key;
  console.log('deleteImageFromS3 : Key -> ', Key);
  try {
    await s3.deleteObject({Key,Bucket: bucket,}).promise();
    next();
  } catch (err) {
    console.log(err);
    res.status(404).send({
      code: 404,
      message: 'File not found',
    });
  }
};

module.exports = { uploadImageToS3, getImageFromS3, deleteImageFromS3 };

// ---------------------------------------------------------------
// -------------------- !!!!!!!!!!!!!!!!!! -----------------------

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html

// -------------------- !!!!!!!!!!!!!!!!!! -----------------------
// ---------------------------------------------------------------

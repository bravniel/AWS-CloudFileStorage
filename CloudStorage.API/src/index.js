const express = require('express');
const cors = require('cors');

const port = process.env.PORT;
require('./db/mongoose');
const userRouter = require('./routers/userRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.listen(port, () => console.log('Server is running and connected to port: ', port));

// npm i express cors mongoose multer multer-s3 aws-sdk
// npm i --save-dev nodemon env-cmd

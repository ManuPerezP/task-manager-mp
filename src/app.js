const express = require("express");
const { model } = require("mongoose");
require("./db/mongoose");

// const User = require("./model/user");
// const Task = require("./model/tasks");
const taskRouter = require("./routers/task");
const userRouter = require("./routers/user");

// const { ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// const multer = require("multer");
// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       // if(!file.originalname.endsWith('.pdf')){
//       return cb(new Error("Please upload a Word document"));
//     }

//     cb(undefined, true);
//   },
// });

// app.post(
//   "/upload",
//   upload.single("upload"),
//   (req, res) => {
//     res.send();
//   },
//   (error, req, res, next) => {//the function must have those params bc in this way express knows its a errorhanlder function
//     res.status(400).send({ error: error.message });
//   }
// );

// middleware
// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   if (req.method === "GET") {
//     res.send("GET request are disabled");
//   }

//   next();
// });

// app.use((req, res, next)=>{
//     res.status(503).send('Site is currently down. Check back soon!')
// })

app.use(express.json()); //para parsear los request req.body

app.use(userRouter);
app.use(taskRouter);

module.exports = app

// app.listen(port, () => {
//   console.log("Server is up on port", port);
// });

// const myFunction = async () => {};

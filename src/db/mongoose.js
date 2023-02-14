const mongoose = require("mongoose");
const validator = require("validator");

// mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  // useCreateIndex: true
//   useCreateIndex: true, //make this true
  autoIndex: true, //make this also true  , para que los index funcionen y el unique true tambien, sino se registran repetidos (email)
});

//Users

//creando tabla usuario

// const User = mongoose.model("User", {
//   name: {
//     type: String, //https://mongoosejs.com/docs/schematypes.html  for more parameters list
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is invalid");
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6,
//     trim: true,
//     validate(value){
//         if(value.toLowerCase().includes('password')){
//            throw new Error('Password cannot containt password')
//         }
//     }
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be a positive number");
//       }
//     },
//   },
// });

// // creando un usuario

// const me = new User({
//   name: "with pass",
//   email: 'hola@hola.cl',
//   password: 'myp-papa'
// });

// //guardandolo en la db

// me.save()
//   .then((result) => {
//     console.log("result:: ", result, me);
//   })
//   .catch((error) => console.log("Error:: ", error));

// //Tasks

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         trim: true,
//         required: true,
//     },
//     completed: {
//         type: Boolean,
//         default: false,
//         // required: false,
//     }
// })

// const task = new Task({
//     description: 'Learn the mongoose library 11111',
//     completed: false
// })
//  task.save().then((result)=>{
//     console.log('result:: ', result, task)
// }).catch(error=> console.log('Error:: ', error))

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

// mongoose.connection.close()

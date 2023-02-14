const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./tasks");

const userSchema = mongoose.Schema({
  name: {
    type: String, //https://mongoosejs.com/docs/schematypes.html  for more parameters list
    required: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot containt password");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  avatar:{
    type: Buffer,
    required: false
  }},
{
  timestamps: true //adds date for when it was create and last update
});

userSchema.statics.findByCredentials = async function (email, password) {
  console.log("email, password", email, password);
  const user = await User.findOne({ email });
  console.log("user", user);
  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("isMatch", isMatch);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

userSchema.virtual("tasks", {
  //creacion de la relacion entre tablas
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

//when override th toJSON method you can modify the reruning object:(you can also use a custom function to do this)
//but if you override toJSON the system made for you
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  console.log("userObject::", userObject);
  //we delete sensitive data
  delete userObject.password;
  delete userObject.tokens;

  delete userObject.avatar

  return userObject;
};

//we can attached no methods in this way
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  // code before saving goes here
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next(); //must be called to continue if not this ends has a loop
});

userSchema.pre('remove', async function (next){
    const user = this;

    await Task.deleteMany({ owner: user._id })

    next()
})

const User = mongoose.model("User", userSchema);

module.exports = User;

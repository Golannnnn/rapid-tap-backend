const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// the lowercase and trim validate that fields are in lowercase and without any unnecessary whitespace
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/dpolqsl5b/image/upload/v1685790087/rapid_tap/default_wley11.png",
  },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

module.exports = mongoose.model("User", userSchema);

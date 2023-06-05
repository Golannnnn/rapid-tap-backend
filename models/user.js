const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// the lowercase and trim validate that fields are in lowercase and without any unnecessary whitespace
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    minlength: 3,
    maxlength: 30,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  nickname: {
    type: String,
    required: [true, "Nickname is required"],
    unique: true,
    minlength: 3,
    maxlength: 13,
    lowercase: true,
    trim: true,
  },
  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/dpolqsl5b/image/upload/v1685790087/rapid_tap/default_wley11.png",
  },
  password: {
    type: String,
    required: true,
  },
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

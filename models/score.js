const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const scoreSchema = new mongoose.Schema(
  {
    score: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true, // populate user field with user data
      required: true,
    },
  },
  { timestamps: true } //created two fields: createdAt and updatedAt with timestamps
);

scoreSchema.plugin(uniqueValidator);
scoreSchema.plugin(require("mongoose-autopopulate"));

scoreSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Score", scoreSchema);

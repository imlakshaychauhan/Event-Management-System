const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true,
  },
  eventsRegisteredTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", // Reference to the events user is registered to
    },
  ],
  myCreatedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", // Reference to the events created by the user
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

// const User = mongoose.model("User", userSchema);

const User = mongoose.model('User', userSchema);


module.exports = User;
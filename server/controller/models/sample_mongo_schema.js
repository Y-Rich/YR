const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  author: {
    type: String,
  },
  content: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: Date,
  comments: [
    {
      user: String,
      content: String,
      votes: Number,
    },
  ],
});

module.exports = blogSchema;

//참고

// // Defining User schema
// const userSchema = new mongoose.Schema({ name: String, age: Number });

// // Defining User model
// const User = mongoose.model("sample", userSchema);

// // Create collection of Model
// User.createCollection().then(function (collection) {
//   console.log("Collection is created!");
// });

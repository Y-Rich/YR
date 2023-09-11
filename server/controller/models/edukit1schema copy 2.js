const mongoose = require('mongoose');
const { Schema } = mongoose;

const Edukit1Schema = new Schema({
  DataTime: { type: Date, default: Date.now },
  Wrapper: [
    {
      tagId: { type: Number, required: true },
      name: { type: String, required: true },
      value: { type: mongoose.Schema.Types.Mixed }, // 값의 데이터 타입은 다양할 수 있음
    },
  ],
  // slug: {
  //   type: String,
  //   lowercase: true,
  // },
  // issuer: {
  //   type: String,
  //   default: 'UVC-edukit-1호',
  // },
  // author: {
  //   type: String,
  // },
  // content: String,
  // tags: [String],
  // createdAt: {
  //   type: Date,
  //   default: () => Date.now(),
  //   immutable: true,
  // },
  // updatedAt: Date,
  // comments: [
  //   {
  //     user: String,
  //     content: String,
  //     votes: Number,
  //   },
  // ],
});

module.exports = Edukit1Schema;

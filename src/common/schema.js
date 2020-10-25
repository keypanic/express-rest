const { Schema } = require('mongoose');
const uuid = require('uuid');

const UserSchema = new Schema({
  _id: { type: String, default: uuid },
  name: String,
  login: String,
  password: String
});

const BoardSchema = new Schema({
  _id: { type: String, default: uuid },
  title: String,
  columns: [
    {
      title: String,
      order: Number
    }
  ]
});

const TaskSchema = new Schema({
  _id: { type: String, default: uuid },
  title: String,
  order: Number,
  description: String,
  userId: String,
  boardId: String,
  columnId: String
});

module.exports = {
  UserSchema,
  BoardSchema,
  TaskSchema
};

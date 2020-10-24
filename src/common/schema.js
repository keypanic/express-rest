const { Schema } = require('mongoose');

const UserSchema = new Schema({
  id: String,
  name: String,
  login: String,
  password: String
});

const BoardSchema = new Schema({
  id: String,
  title: String,
  columns: [
    {
      title: String,
      order: Number
    }
  ]
});

const TaskSchema = new Schema({
  id: String,
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

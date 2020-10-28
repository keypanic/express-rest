require('dotenv').config();
const mongoose = require('mongoose');
const { UserSchema, BoardSchema, TaskSchema } = require('./schema');
const { MONGO_CONNECTION_STRING } = require('./config');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('returnOriginal', false);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected');
});

const userModel = mongoose.model('Users', UserSchema);
const boardModel = mongoose.model('Boards', BoardSchema);
const taskModel = mongoose.model('Tasks', TaskSchema);

module.exports = {
  userModel,
  boardModel,
  taskModel
};

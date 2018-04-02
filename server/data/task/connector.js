import mongoose from 'mongoose';

const schema = {
  title: String,
  boardId: String,
  order: Number
}

const Task = mongoose.model('Task', schema);

export default Task;

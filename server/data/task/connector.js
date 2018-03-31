import mongoose from 'mongoose';

const schema = {
  title: String,
  boardId: String
}

const Task = mongoose.model('Task', schema);

export default Task;

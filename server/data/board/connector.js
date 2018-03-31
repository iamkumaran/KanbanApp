import mongoose from 'mongoose';

const schema = {
  name: String
}

const Board = mongoose.model('Board', schema);

export default Board;

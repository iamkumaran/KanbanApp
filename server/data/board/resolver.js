import Board from './connector';
import Task from '../task/connector';

const resolvers = {
  Query: {
    boards(root, {query}, context){
      const selector = (query && query.selector) || {};
      const options = (query && query.options) || {};

      const boards = Board.find(selector);

      if(options){
        const {limit, skip, sort} = options;
        if(limit)
          boards.limit(limit);

        if(skip)
          boards.skip(skip);

        if(sort)
          boards.sort(sort);
      }

      return boards;
    }
  },
  Board: {
    task(board) {
      console.log('Task', board._id);
      return Task.find({boardId: board._id});
    },
  },
  Mutation: {
    createBoard(_, {doc}){
      let board = new Board(doc);
      board.save();

      return board;
    },
    updateBoard(_, {query, doc}){
      const board = Board.update(query.selector, {$set: doc});
      return board;
    }
  }
}

export default resolvers;

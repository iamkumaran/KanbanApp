import { find, filter } from 'lodash';
import Task from './connector';
import Board from '../board/connector'

const resolvers = {
  Query: {
    tasks(root, {query}, context){
      const selector = (query && query.selector) || {};
      const options = (query && query.options) || {};

      const tasks = Task.find(selector);

      if(options){
        const {limit, skip, sort} = options;
        if(limit)
          tasks.limit(limit);

        if(skip)
          tasks.skip(skip);

        if(sort)
          tasks.sort(sort);
      }

      return tasks;
    }
  },
  Task: {
    board(task) {
      console.log('BoardID', task.boardId);
      return Board.findById(task.boardId);
    },
  },
  Mutation : {
    createTask(_, {doc}){
      let task = new Task(doc);
      task.save();

      return task;
    },
    updateTask(_, {query, doc}){
      const task = Task.update(query.selector, {$set: doc});
      return task;
    }
  },
};

export default resolvers;

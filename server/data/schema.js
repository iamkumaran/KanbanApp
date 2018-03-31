import {makeExecutableSchema} from 'graphql-tools';
import Task from './task/schema';
import Board from './board/schema';
import resolvers from './resolvers';

const Query = `
  scalar JSON

  type Query {
    tasks(query: QueryInput): [Task]
    boards(query: QueryInput): [Board]
  }

  # Define criteria here
  input QueryInput {
    selector: JSON
    options: JSON
  }
`;

const Mutation = `
  type Mutation {

    # Task create
    createTask(doc: TaskDocInput!): Task
    # Task update
    updateTask(query: QueryInput!, doc: TaskDocInput!): Task

    # Board create
    createBoard(doc: BoardDocInput!): Board
    # Board update
    updateBoard(query: QueryInput!, doc: BoardDocInput!): Board
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, Query, Mutation, Task, Board],
  resolvers
})

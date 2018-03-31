import { merge } from 'lodash';
import taskResolvers from './task/resolver';
import boardResolvers from './board/resolver';
const GraphQLJSON = require('graphql-type-json');

const JSONresolver = {
  JSON: GraphQLJSON,
}

const resolvers = merge(JSONresolver, taskResolvers, boardResolvers);

export default resolvers;

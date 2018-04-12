import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
// import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import * as _ from "lodash";

// import { Board, Query } from '../../types';
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {
  boards: any;
  boardIndex: number;
  gqlQuery: any;

  constructor(private apollo: Apollo) {
    this.gqlQuery = gql`
      query boards {
        boards {
          _id
          name
          task {
            _id
            title
            order
          }
        }
      }
    `;
  }



  getAllBoards() {
    return this.boards = this.apollo.watchQuery<any>({
      query: gql`
        query boards {
          boards {
            _id
            name
            task {
              _id
              title
              order
            }
          }
        }
      `
    }).valueChanges
      .map(({ data }) => {
        console.log('all boards', data);
        return Object.values(data.boards)
      });
  }

  addBoard (payload) {
    this.apollo.mutate({
      mutation: gql`
        mutation ($doc: BoardDocInput!){
          createBoard(doc: $doc){
            _id
            name
            task {
              _id
              title
              order
            }
          }
        }
      `,
      variables: {
        doc: {
          name: payload.boardName
        }
      },
      update: (proxy, { data: { createBoard } }) => {
        // Read the data from our cache for this query.
        const data:any = proxy.readQuery({ query:  this.gqlQuery});

        data.boards.push(createBoard)

        // Write our data back to the cache.
        proxy.writeQuery({ query: this.gqlQuery, data });
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);

    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  updateBoard (payload) {
    this.apollo.mutate({
      mutation: gql`
        mutation ($query: QueryInput!, $doc: BoardDocInput!){
          updateBoard(query: $query, doc: $doc){
            name
          }
        }
      `,
      variables: {
        query: {
          selector: {
            _id: payload.boardId
          }
        },
        doc: {
          name: payload.newTitle
        }
      },
      update: (proxy, { data: { updateBoard } }) => {
        // Read the data from our cache for this query.
        const data:any = proxy.readQuery({ query:  this.gqlQuery});

        const boardIndex = _.findIndex(data.boards, x => x._id === payload.boardId);
        data.boards[boardIndex].name = payload.newTitle;

        // Write our data back to the cache.
        proxy.writeQuery({ query: this.gqlQuery, data });
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);

    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  removeBoard (payload) {
    this.apollo.mutate({
      mutation: gql`
        mutation ($query: QueryInput!) {
          removeBoard(query: $query) {
            _id
          }
        }
      `,
      variables: {
        query: {
          selector: {
            _id: payload.boardId
          }
        }
      },
      update: (proxy, { data: { removeBoard } }) => {
        // Read the data from our cache for this query.
        const data:any = proxy.readQuery({ query:  this.gqlQuery});

        const boardIndex = _.findIndex(data.boards, x => x._id === payload.boardId);
        data.boards.splice(boardIndex, 1)

        // Write our data back to the cache.
        proxy.writeQuery({ query: this.gqlQuery, data });
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);

    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  addTask (payload) {
    this.apollo.mutate({
      mutation: gql`
        mutation ($doc: TaskDocInput!){
          createTask(doc: $doc){
            _id
            title
            order
          }
        }
      `,
      variables: {
        doc: {
          title: payload.taskName,
          boardId: payload.boardId
        }
      },
      update: (proxy, { data: { createTask } }) => {
        // Read the data from our cache for this query.
        const data:any = proxy.readQuery({ query:  this.gqlQuery});

        const boardIndex = _.findIndex(data.boards, x => x._id === payload.boardId);
        data.boards[boardIndex].task.push(createTask)

        // Write our data back to the cache.
        proxy.writeQuery({ query: this.gqlQuery, data });
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);

    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  updateTask (payload) {
    this.apollo.mutate({
      mutation: gql`
        mutation ($query: QueryInput!, $doc: TaskDocInput!){
          updateTask(query: $query, doc: $doc){
            title
          }
        }
      `,
      variables: {
        query: {
          selector: {
            _id: payload.taskId
          }
        },
        doc: {
          title: payload.newTitle
        }
      },
      update: (proxy, { data: { updateTask } }) => {
        // Read the data from our cache for this query.
        const data:any = proxy.readQuery({ query:  this.gqlQuery});

        const boardIndex = _.findIndex(data.boards, x => x._id === payload.boardId);
        const taskIndex = _.findIndex(data.boards[boardIndex].task, x => x._id === payload.taskId);
        data.boards[boardIndex].task[taskIndex].title = payload.newTitle;

        // Write our data back to the cache.
        proxy.writeQuery({ query: this.gqlQuery, data });
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);

    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  deleteTask (payload) {
    this.apollo.mutate({
      mutation: gql`
        mutation ($query: QueryInput!) {
          removeTask(query: $query) {
            _id
          }
        }
      `,
      variables: {
        query: {
          selector: {
            _id: payload.taskId
          }
        }
      },
      update: (proxy, { data: { removeTask } }) => {
        // Read the data from our cache for this query.
        const data:any = proxy.readQuery({ query:  this.gqlQuery});

        const boardIndex = _.findIndex(data.boards, x => x._id === payload.boardId);
        const taskIndex = _.findIndex(data.boards[boardIndex].task, x => x._id === payload.taskId);
        data.boards[boardIndex].task.splice(taskIndex, 1)

        // Write our data back to the cache.
        proxy.writeQuery({ query: this.gqlQuery, data });
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);

    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }
}

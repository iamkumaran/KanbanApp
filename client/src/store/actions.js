import gql from 'graphql-tag'
import graphqlClient from './apollo'

export const actions = {
  async fetchBoardList ({ commit }) {
    const response = await graphqlClient.query({
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
    })

    commit('setBoardList', JSON.parse(JSON.stringify(response.data.boards)))
  },
  async addTask ({ commit }, payload) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation ($doc: TaskDocInput!){
          createTask(doc: $doc){
            _id
            title
          }
        }
      `,
      variables: {
        doc: {
          title: payload.taskName,
          boardId: payload.boardId
        }
      }
    })
    console.log('add vuex', response)
    commit('addTask', {boardIndex: payload.boardIndex, task: response.data.createTask})
  },
  async removeTask ({ commit }, payload) {
    const response = await graphqlClient.mutate({
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
      }
    })
    console.log('remove vuex', response)
    commit('removeTask', {boardId: payload.boardId, taskId: payload.taskId})
  },
  async updateTask ({ commit }, payload) {
    const response = await graphqlClient.mutate({
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
      }
    })

    if (response.errors) {
      console.log('Update Task Falied')
      return false
    }

    commit('updateTask', payload)
  },
  async reorderTasks ({ commit }, payload) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation ($query: QueryInput!, $doc: TaskDocInput!) {
          updateTaskOrder(query: $query, doc: $doc) {
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
          boardId: payload.newBoardId,
          order: payload.newOrder
        }
      }
    })

    if (response.errors) {
      console.log('Reorder Falied')
      return false
    }
    // commit('reorderTasks', payload)
  },

  async addBoard ({ commit }, payload) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation ($doc: BoardDocInput!){
          createBoard(doc: $doc){
            _id
            name
            task {
              _id
              title
            }
          }
        }
      `,
      variables: {
        doc: {
          name: payload.boardName
        }
      }
    })
    console.log('add board vuex', response)
    commit('addBoard', { board: response.data.createBoard })
  },
  async updateBoard ({ commit }, payload) {
    const response = await graphqlClient.mutate({
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
      }
    })
    if (response.errors) {
      console.log('Update Task Falied')
      return false
    }

    commit('updateBoard', payload)
  },
  async removeBoard ({ commit }, payload) {
    const response = await graphqlClient.mutate({
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
      }
    })

    if (response.errors) {
      console.log('Delete Failed')
      return false
    }

    commit('removeBoard', {boardId: payload.boardId})
  }
}

export default actions

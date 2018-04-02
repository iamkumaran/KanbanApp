import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag'

import graphqlClient from './apollo'

Vue.use(Vuex)

export const mutations = {
  setBoardList (state, boards) {
    state.boards = boards
  },
  addTask (state, data) {
    // console.log('addtask', data, state.boards[data.boardIndex].task)
    state.boards[data.boardIndex].task.push(data.task)
  },
  removeTask (state, data) {
    // var i = _.find
    for (let key in state.boards) {
      if (state.boards[key]._id === data.boardId) {
        var taskIndex = state.boards[key].task.findIndex(x => x._id === data.taskId)
        state.boards[key].task.splice(taskIndex, 1)
        break
      }
    }
  },
  updateTask (state, data) {
    for (let key in state.boards) {
      if (state.boards[key]._id === data.boardId) {
        var taskIndex = state.boards[key].task.findIndex(x => x._id === data.taskId)
        state.boards[key].task[taskIndex].title = data.newTitle
        break
      }
    }
  },
  addBoard (state, data) {
    console.log('add board', state.boards, state.boards.length)
    // if (state.boards.length)
    state.boards.push(data.board)
  },
  removeBoard (state, data) {
    for (let key in state.boards) {
      if (state.boards[key]._id === data.boardId) {
        // delete state.boards[key]
        Vue.delete(state.boards, key)
        break
      }
    }
  },

  openModal (state, data) {
    state.modalData.isModalOpen = true
  },
  closeModal (state, data) {
    state.modalData.isModalOpen = false
  }
}

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
            }
          }
        }
      `
    })
    console.log('vuex', Object.assign({}, response.data.boards))

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
    console.log('add vuex', response)
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
      console.log('Update Falied')
      return false
    }

    commit('updateTask', payload)
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
  },

  openModal (context, payload) {
    context.commit('openModal', payload)
  },
  closeModal (context, payload) {
    context.commit('closeModal', payload)
  }
}

export const state = {
  boards: [],
  modalData: {
    isModalOpen: false
  }

}

export default new Vuex.Store({
  mutations,
  actions,
  state
})

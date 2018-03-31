import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag'

import graphqlClient from './apollo'

Vue.use(Vuex)

export const mutations = {
  setBoardList (state, boards) {
    state.boards = boards
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
    console.log('vuex', response.data.boards)
    commit('setBoardList', response.data.boards)
  }
}

export const state = {
  boards: []
}

export default new Vuex.Store({
  mutations,
  actions,
  state
})

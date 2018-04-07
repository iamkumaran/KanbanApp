import Vue from 'vue'
import Vuex from 'vuex'
// import gql from 'graphql-tag'
//
// import graphqlClient from './apollo'

import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export const state = {
  boards: []
}

export default new Vuex.Store({
  mutations,
  actions,
  state
})

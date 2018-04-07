import Vue from 'vue'

export const mutations = {
  setBoardList (state, boards) {
    state.boards = boards
  },
  addTask (state, data) {
    // console.log('addtask', data, state.boards[data.boardIndex].task)
    state.boards[data.boardIndex].task.push(data.task)
  },
  removeTask (state, data) {
    for (let key in state.boards) {
      if (state.boards[key]._id === data.boardId) {
        const taskIndex = state.boards[key].task.findIndex(x => x._id === data.taskId)
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
  reorderTasks (state, data) {
    let taskToMove, newBoardIndex
    for (let key in state.boards) {
      if (state.boards[key]._id === data.currBoardId) {
        const taskIndex = state.boards[key].task.findIndex(x => x._id === data.taskId)
        taskToMove = state.boards[key].task.splice(taskIndex, 1)
      }
      if (state.boards[key]._id === data.newBoardId) {
        newBoardIndex = key
      }
    }

    state.boards[newBoardIndex].task.splice(data.newOrder, 0, taskToMove)
  },
  addBoard (state, data) {
    // if (state.boards.length)
    state.boards.push(data.board)
  },
  updateBoard (state, data) {
    for (let key in state.boards) {
      if (state.boards[key]._id === data.boardId) {
        state.boards[key].name = data.newTitle
        break
      }
    }
  },
  removeBoard (state, data) {
    for (let key in state.boards) {
      if (state.boards[key]._id === data.boardId) {
        // delete state.boards[key]
        Vue.delete(state.boards, key)
        break
      }
    }
  }
}

export default mutations

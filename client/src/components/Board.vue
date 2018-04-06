<template>
  <div class="kanban">
    <i class="material-icons rm-board" title="Delete Board" @click="deleteBoard">delete</i>
    <h2 class="kanban_title">{{board.name}}</h2>
    <draggable element="div" :options="{draggable:'.task-items', group: 'sortables', ghostClass: 'dd-placeholder'}" @end="onEnd">
      <transition-group name="no" class="list-group" tag="ol" :data-id="board._id">
          <Task class="task-items" :data-id="task._id" :task="task" :key="task._id" :boardId="board._id" v-for="task in board.task"/>
      </transition-group>
    </draggable>
    <form v-if="showForm" class="add-board-form">
      <p><input type="text" value="" v-model="addTaskInput" ref="input" placeholder="Add Task"/></p>
      <p><button @click="addTask">Add</button> <i class="material-icons" title="Cancel" @click="cancelTask">cancel</i></p>
    </form>
    <div class="actions" v-if="!showForm">
      <button class="addbutt" title="Add New Task" @click="showAddForm"><i class="material-icons">control_point</i> Add new</button>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Task from '@/components/Task'

export default {
  name: 'Board',
  components: {
    draggable,
    Task
  },
  props: ['boardIndex', 'board'],
  data () {
    return {
      addTaskInput: '',
      showForm: false
      // dragBoardModel: this.$store.state.boards[this.boardIndex].task
    }
  },
  methods: {
    showAddForm (e) {
      this.showForm = true
      setTimeout(function () {
        this.$refs['input'].focus()
      }.bind(this), 100)
    },
    addTask () {
      if (!this.addTaskInput) {
        this.$refs['input'].focus()
        return false
      }
      this.$store.dispatch('addTask', {boardId: this.board._id, boardIndex: this.boardIndex, taskName: this.addTaskInput})

      this.cancelTask()
    },
    cancelTask () {
      this.addTaskInput = ''
      this.showForm = false
    },
    deleteBoard () {
      this.$store.dispatch('removeBoard', {boardId: this.board._id})
    },
    onEnd (e) {
      if (e.to.dataset.id === e.from.dataset.id && e.newIndex === e.oldIndex) return false
      this.$store.dispatch('reorderTasks', {newOrder: e.newIndex + 1, newBoardId: e.to.dataset.id, taskId: e.item.dataset.id, currBoardId: e.from.dataset.id})
    }
  }
}
</script>

<style>
  .add-board-form input {
    font-size: 22px;
    padding: 12px;
    box-sizing: border-box;
    width: 100%;
  }
  .add-board-form p{
    text-align: center;
  }
  .add-board-form button {
    width: 100px;
  }
  .add-board-form p i {
    margin-left: 30px;
    display: inline-block;
    vertical-align: middle;
  }
</style>

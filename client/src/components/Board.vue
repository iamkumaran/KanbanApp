<template>
  <div class="kanban To-do">
    <i class="material-icons rm-board" @click="deleteBoard">delete</i>
    <h2 class="kanban__title">{{board.name}}</h2>
    <draggable element="div" :options="{draggable:'.task-items', group: 'sortables', ghostClass: 'dd-placeholder'}" @end="onEnd">
      <transition-group name="no" class="list-group" tag="ol">
          <Task class="task-items" :task="task" :key="task._id" :boardId="board._id" v-for="task in board.task"/>
      </transition-group>
    </draggable>
    <form v-if="showForm">
      <input type="text" value="" v-model="addTaskInput"/>
      <button @click="addTask">Add</button> <i class="material-icons" @click="cancelTask">cancel</i>
    </form>
    <div class="actions" v-if="!showForm">
      <button class="addbutt" @click="showForm = true"><i class="material-icons">control_point</i> Add new</button>
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
    }
  },
  methods: {
    addTask () {
      if (!this.addTaskInput) return false
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
      console.log(e)
    }
  }
}
</script>

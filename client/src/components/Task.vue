<template>
  <li :id="'task-'+task._id" class="dd-item">
    <h3 class="title dd-handle" contenteditable="true" title="click to edit and ENTER to save" ref="editInput" v-on:keydown.enter="updateTask" v-on:blur="updateTask">{{task.title}}</h3>
    <div class="actions">
      <i class="material-icons" title="Edit Task" @click="editFocus">edit</i>
      <i class="material-icons" title="Delete Task" @click="deleteTask">delete</i>
      <i class="material-icons fright" title="Drag and Drop">sort</i>
    </div>
  </li>
</template>

<script>
export default {
  name: 'Task',
  props: ['boardId', 'task'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    editFocus () {
      this.$refs['editInput'].focus()
    },
    updateTask () {
      this.$refs['editInput'].blur()
      let newTitle = this.$refs['editInput'].innerText.trim()
      if (!newTitle || this.task.title === newTitle) {
        this.$refs['editInput'].innerText = this.task.title
        return false
      }

      this.$store.dispatch('updateTask', { boardId: this.boardId, taskId: this.task._id, newTitle: newTitle })
    },
    deleteTask () {
      this.$store.dispatch('removeTask', { boardId: this.boardId, taskId: this.task._id })
    }
  }
}
</script>

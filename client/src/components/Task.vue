<template>
  <li :id="'task-'+task._id" class="dd-item">
    <h3 class="title dd-handle" contenteditable="true" title="click to edit and ENTER to save" ref="editInput" v-on:keydown.enter="updateTask($event, task)" v-on:blur="updateTask($event, task)">{{task.title}}</h3>
    <div class="actions">
      <i class="material-icons" title="Edit Task" @click="editFocus">edit</i>
      <i class="material-icons" title="Delete Task" @click="deleteTask">delete</i>
      <i class="material-icons" title="Drag and Drop">sort</i>
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
    updateTask (e, task) {
      let newTitle = e.target.innerText.trim()
      if (!newTitle || this.task.title === newTitle) e.target.innerText = this.task.title
      this.$refs['editInput'].blur()

      this.$store.dispatch('updateTask', { boardId: this.boardId, taskId: this.task._id, newTitle: newTitle })
    },
    deleteTask () {
      this.$store.dispatch('removeTask', { boardId: this.boardId, taskId: this.task._id })
    }
  }
}
</script>

<style>
[contenteditable=true] {
  word-break: break-all;
}
[contenteditable=true]:focus {
  border: 1px solid transparent;
  border-radius: 10px;
}
</style>

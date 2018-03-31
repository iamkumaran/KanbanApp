<template>
  <ol class="kanban To-do">
    <div class="kanban__title"><h2>{{board.name}}</h2></div>
    <Task v-bind:task="task" :key="task._id" v-for="task in board.task"/>
    <div class="actions">
      <button class="addbutt"><i class="material-icons">control_point</i> Add new</button>
    </div>
  </ol>
</template>

<script>
import Task from '@/components/Task'

export default {
  name: 'Board',
  components: {
    Task
  },
  props: ['board'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

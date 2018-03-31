<template>
  <li class="dd-item" data-id="1" >
    <h3 class="title dd-handle">{{task.title}}</h3>
    <div class="actions">
      <i class="material-icons">edit</i>
    </div>
  </li>
</template>

<script>
export default {
  name: 'Task',
  props: ['task'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

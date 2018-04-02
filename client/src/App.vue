<template>
  <div id="app">
    <button class="add-board-btn" @click="showModal = true">Add Board</button>
    <h2>Kanban App</h2>
    <Board :board="board" :boardIndex="index" :key="board._id" v-for="(board, index) in boards"/>
    <VueModal v-if="showModal" @close="closeModal">
      <h3 slot="header">Add Task</h3>
      <form slot="body">
        <input type="text" value="" v-model="addBoardInput"/>
        <button @click="addBoard">Add</button>
        <button @click="closeModal"><i class="material-icons">cancel</i></button>
      </form>
    </VueModal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Board from '@/components/Board'
import VueModal from '@/components/VueModal'

export default {
  name: 'App',
  components: {
    Board,
    VueModal
  },
  data () {
    return {
      showModal: false,
      addBoardInput: ''
    }
  },
  computed: {
    ...mapState(['boards'])
  },
  methods: {
    addBoard () {
      if (!this.addBoardInput) return false
      this.$store.dispatch('addBoard', {boardName: this.addBoardInput})
      this.closeModal()
    },
    closeModal () {
      this.addBoardInput = ''
      this.showModal = false
    }
  },
  beforeCreate () {
    this.$store.dispatch('fetchBoardList')
  }
}
</script>

<style>
/* latin-ext */
@font-face {
  font-family: 'Arbutus Slab';
  font-style: normal;
  font-weight: 400;
  src: local('Arbutus Slab Regular'), local('ArbutusSlab-Regular'), url(https://fonts.gstatic.com/s/arbutusslab/v6/oY1Z8e7OuLXkJGbXtr5ba7ZlYqUcBFWVAFuI.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Arbutus Slab';
  font-style: normal;
  font-weight: 400;
  src: local('Arbutus Slab Regular'), local('ArbutusSlab-Regular'), url(https://fonts.gstatic.com/s/arbutusslab/v6/oY1Z8e7OuLXkJGbXtr5ba7ZlbKUcBFWVAA.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* fallback */
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v36/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
}
.material-icons:hover {
  color: #000;
}
.material-icons a{
  text-decoration: none;
  color: inherit;
}
Body {
  font-family: Sans-serif;
  font size: 14;
  width: 100%;
  background-color: #E0E0E0;
}

h1 {
  position: absolute;
  left: 16px;
  top: 16px;
}

.add-board-btn {
  float:right;
  margin-right: 75px;
  padding: 10px 50px;
}

.dd {
  max-width: 100%;
  top: 88px;
  margin: 0 auto;
  display: block;
  vertical-align: top;
}

ol {
  padding: 0;
  transition: border-color 2s ease, all 0.1s ease;
  min-height: 100px;
}

H2,
h1,
button {
  margin-left: 5px;
  font-family: 'Arbutus Slab', serif;
}

h2 {
  color: #607D8B;
}

h2 .material-icons {
  color: #B0BEC5;
  line-height: 1.5;
}

.dd-handle .material-icons {
  color: #B0BEC5;
  font-size: 14px;
  font-weight: 800;
  line-height: 2rem;
  position: relative;
  right: 0;
  color: #607D8B;
  padding: 5px 16px;
}

button>.material-icons {
  line-height: 0.2;
  position:relative;
  top:7px;
}

.dd-item:hover,
button:hover {
  color: #00838F;
  will-change: box-shadow;
  transition: box-shadow .2s cubic-bezier(.4, 0, 1, 1), background-color .2s cubic-bezier(.4, 0, .2, 1), color .2s cubic-bezier(.4, 0, .2, 1);
  box-shadow: 0 5px 6px 0 rgba(0, 0, 0, .14), 0 3px 1px -6px rgba(0, 0, 0, .2), 2px 5px 3px 0 rgba(0, 0, 0, .12);
}

.rm-board{
  color: #B0BEC5;
  float:right;
  line-height: 1.4;
}
.kanban__title{
  margin-top: 0px;
  margin-right: 25px;
}
.button.addbutt {
  background-color: #EEEEEE;
  color: #607D8B;
  width: 100%;
  box-sizing: border-box;
}

.list > .button.addbutt {
  max-width: 330px;
}

button:active, button:down, button:focus {box-shadow: 0 0 0 0, 0 0 0 0 rgba(0, 0, 0, .2), 0 0 0 0 rgba(0, 0, 0, .12);color:#00838F;}
button {
  align-items: center;
  background-color: #EEEEEE;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
  border: 1px solid #ccc;
  border-radius: 2px;
  color: #607D8B;
  position: relative;
  margin: 0;
  min-width: 44px;
  padding: 10px 16px;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  text-decoration: none;
    }

.kanban.To-do {
  border-top: 5px solid #FFB300;
}

.kanban {
  border-top: 5px solid #78909C;
  width: 20%;
  height: auto;
  margin: 1%;
  max-width: 250px;
  min-width: 120px;
  display: inline-block;
  vertical-align: top;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
  flex-direction: column;
  min-height: 200px;
  z-index: 1;
  position: relative;
  background: #fff;
  padding: 1em;
  border-radius: 2px;
}

.dd-item {
  display: block;
  position: relative;
  list-style: none;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  min-height: 48px;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 16px;
  /* min-height: 120px; */
  overflow: hidden;
  z-index: 1;
  position: relative;
  background: #fff;
  border-radius: 2px;
  box-sizing: border-box;
}

.title {
  align-self: flex-end;
  color: inherit;
  display: block;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  font-size: 24px;
  line-height: normal;
  overflow: hidden;
  -webkit-transform-origin: 149px 48px;
  transform-origin: 149px 48px;
  margin: 0;
}

.text {
  color: grey;
  border-top: 1px solid;
  font-size: 1rem;
  font-weight: 400;
  line-height: 18px;
  overflow: hidden;
  padding: 16px;
  width: 90%;
}

.actions {
  border-top: 1px solid rgba(0, 0, 0, .1);
  font-size: 8px;
  line-height: normal;
  width: 100%;
  color: #B0BEC5;
  padding: 8px;
  box-sizing: border-box;
}

/**
 * Nestable
 */

.dd {
  position: relative;
  display: block;
  list-style: none;
}

.dd-list {
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dd-list .dd-list {
  padding-left: 30px;
}

.dd-collapsed .dd-list {
  display: none;
}

.dd-item {
  display: block;
  margin: 5px 0;
  padding: 5px 10px;
  color: #333;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid #ccc;
  background: #fafafa;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.dd-item:hover {
  background: #fff;
}

.dd-item > button {
  display: block;
  position: relative;
  cursor: move;
  float: left;
  width: 25px;
  height: 20px;
  margin: 5px 0;
  padding: 0;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  border: 0;
  background: transparent;
  font-size: 12px;
  line-height: 1;
  text-align: center;
  font-weight: bold;
}

.dd-item > button:before {
  content: '+';
  display: block;
  position: absolute;
  width: 100%;
  text-align: center;
  text-indent: 0;
}

.dd-item > button[data-action="collapse"]:before {
  content: '<i class="material-icons">filter_none</i>';
}

.dd-placeholder,
.dd-empty {
  margin: 5px 0;
  min-height: 30px;
  background: #E0E0E0;
  border: 1px dashed #b6bcbf;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.dd-empty {
  border: 1px dashed #bbb;
  min-height: 100px;
  background-color: #E0E0E0;
  background-size: 60px 60px;
  background-position: 0 0, 30px 30px;
}

.dd-dragel {
  position: absolute;
  pointer-events: none;
  z-index: 9999;
}

.dd-dragel > .dd-item .dd-handle {
  margin-top: 0;
  cursor: move;
}

.dd-dragel .dd-item {
  -webkit-box-shadow: 2px 4px 6px 0 rgba(0, 0, 0, .5);
  box-shadow: 2px 4px 6px 0 rgba(0, 0, 0, .5);
  cursor: move;
}
</style>

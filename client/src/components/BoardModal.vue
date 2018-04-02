<template>
  <div id="open-modal" class="modal-window">
    <div>
      <a href="#modal-close" title="Close" class="modal-close">Close</a>
      <h1>Add Board</h1>
      <div>
        <form>
          <input type="text" name="textbox" /> <button>Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardModal',
  props: [],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
  .modal-window {
    position: fixed;
    background-color: rgba(255, 255, 255, 0.15);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }

  .modal-window:target {
    opacity: 1;
    pointer-events: auto;
  }

  .modal-window:target::before {
    background: rgba(0,0,0,0.6);
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .modal-window>div {
    width: 300px;
    position: relative;
    margin: 10% auto;
    padding: 4rem 2rem;
    background: #fff;
    color: #444;
  }

  .modal-window header {
    font-weight: bold;
  }

  .modal-close {
    color: #aaa;
    line-height: 50px;
    font-size: 80%;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
    width: 70px;
    text-decoration: none;
  }

  .modal-close:hover {
    color: #000;
  }

  .modal-window h1 {
    font-size: 150%;
    margin: 0 0 15px;
  }
  .modal-window input{
    padding: 10px;
    font-size: 16px;
  }
</style>

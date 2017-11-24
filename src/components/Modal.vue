<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="header">
              default header
            </slot>
            <slot name="body">
              default body
            </slot>
          </div>
          <button class="modal-default-button close" @click="$emit('close')"></button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'Modal',
  data () {
    return {
      msg: 'Modal'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
}

.close{
  position: absolute;
  right: 10px;
  top: 10px;
  box-shadow: 0;
  border: 0;
  color: gray;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background:url(../assets/close.svg) no-repeat center center;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  color: #000;
}

.modal-container {
  position: relative;
  width: 400px;
  margin: 0px auto;
  padding: 30px 50px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-default-button {
  float: right;
}

</style>

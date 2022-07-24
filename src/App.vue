<template>
  <div id="app">
    <router-view class="main"></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
    provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
      reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
}
</script>

<style>
  @import "assets/css/index.css";
#app {
  font-size: 16px;
      height: 100%;
}
  .main {
    background: #ededed;;
  }
</style>

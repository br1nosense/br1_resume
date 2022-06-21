<template>
  <div v-show="showcontent">
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "TabPane",
  inject: ["TabsInstance"],
  props: {
    name: {
      type: String
    },
    label: {
      type: [String, Function],
      default: ""
    },
    tabid:{
      type: String
    }
  },
  data() {
    return {
      showcontent: true
    };
  },
  watch: {
    name() {
      this.TabsInstance.initTabs();
    }
  },
  mounted() {
    this.TabsInstance.initTabs();
  }
};
</script>

<style>
</style>
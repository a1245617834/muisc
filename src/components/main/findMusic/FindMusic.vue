<template>
  <div style="background-color: #f5f5f5">
    <Nav msg="" />

    <router-view></router-view>
    <Message msg="" />
  </div>
</template>

<script>
import Nav from "@/components/top/Nav.vue";
import Message from "@/components/foot/Message.vue";
export default {
  name: "FindMusic",
  components: {
    Nav,
    Message,
  },
};
</script>

<style>
</style>
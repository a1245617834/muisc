<template>
  <el-container>
    <el-header>
      <span>热门话题</span>
    </el-header>
    <el-divider></el-divider>
    <el-main>
      <div>
        <el-row></el-row>
      </div>
    </el-main>
    <Message msg="" />
  </el-container>
</template>

<script>
import Message from "@/components/foot/Message.vue";
export default {
  name: "HotTopic",
  components: {
    Message,
  },

  methods: {},
};
</script>

<style>
</style>
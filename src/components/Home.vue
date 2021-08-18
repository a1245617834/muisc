<template>
  <div>
    <!-- 导航，登录，注入-->

    <Navigation msg="" />

    <!-- 主内容，router渲染 -->

    <router-view></router-view>

    <!-- 底部播放器，注入 -->

    <MusicPlayer msg="" />
  </div>
</template>

<script>
import Navigation from "@/components/top/Navigation.vue";
import MusicPlayer from "@/components/foot/MusicPlayer.vue";
export default {
  name: "Home",
  components: {
    Navigation,
    MusicPlayer,
  },
};
</script>

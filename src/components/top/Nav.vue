<template>
  <el-container>
    <el-header style="height: 35px">
      <el-menu default-active="/Recommend" :router="true" mode="horizontal">
        <el-menu-item index="/Recommend">推荐</el-menu-item>
        <el-menu-item index="/MusicRank">排行榜</el-menu-item>
        <el-menu-item index="/SongList">歌单</el-menu-item>
        <el-menu-item index="/Radio">主播电台</el-menu-item>
        <el-menu-item index="/SingerList">歌手</el-menu-item>
        <el-menu-item index="/NewMusic">新碟上架</el-menu-item>
      </el-menu>
    </el-header>
  </el-container>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style lang="less" scoped>
@import "/src/assets/css/top/nav.less";
</style>
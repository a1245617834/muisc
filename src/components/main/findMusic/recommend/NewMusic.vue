<template>
  <el-container>
    <el-main>
      <el-row class="title">
        <el-col :span="24"><span>热门新碟</span></el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class="content">
        <el-col
          v-for="(item, index) in newDisc.slice(0, 10)"
          :key="index"
          @click.native="toAlbumDetail(item.id)"
        >
          <el-image :src="item.picUrl"> </el-image>
          <p>{{ item.name }}</p>
          <p>{{ item.artist.name }}</p>
        </el-col>
      </el-row>
      <el-row class="title">
        <el-col :span="24"><span>全部新碟</span></el-col>
      </el-row>
      <el-divider></el-divider>
      <div>
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from "@/assets/js/axios.js";
export default {
  data() {
    return {
      newDisc: [],
    };
  },
  created() {
    this.getNewDisc();
  },
  methods: {
    getNewDisc() {
      axios({
        url: "album/newest",
        method: "post",
        params: {
          limit: 10,
        },
      })
        .then((res) => {
          this.newDisc = res.data.albums;
        })
        .catch((err) => {});
    },
    toAlbumDetail(id) {
      this.$router.push("/AlbumDetail/" + id);
    },
  },
};
</script>

<style lang="less" scoped>
@import "/src/assets/css/main/findMusic/newDsic/new-music.less";
</style> 
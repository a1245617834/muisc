<!--  -->
<template>
  <el-row>
    <el-col
      v-for="(item, index) in allMusic"
      :key="index"
      @click.native="toAlbumDetail(item.id)"
    >
      <el-image :src="item.picUrl"></el-image>
      <span>{{ item.name }}</span>
    </el-col>
  </el-row>
</template>

<script>
import axios from "@/assets/js/axios.js";
export default {
  data() {
    return {
      allMusic: [],
    };
  },
  created() {
    this.getAllMusic();
    this.getUpDate();
  },
  mounted() {},
  methods: {
    getAllMusic() {
      axios({
        url: "artist/album",
        method: "post",
        params: {
          id: this.$route.params.id,
          limit: 12,
        },
      })
        .then((res) => {
          this.allMusic = res.data.hotAlbums;
          console.log(res.data.playlist);
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
@import "/src/assets/css/main/common/mv/desc-mv.less";
</style>

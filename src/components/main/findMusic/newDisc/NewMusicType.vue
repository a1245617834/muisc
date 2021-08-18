<!--  -->
<template>
  <div>
    <el-row class="all-new">
      <el-col v-for="(item, index) in allNewDisc" :key="index">
        <el-image
          :src="item.blurPicUrl"
          @click.native="toSongList(item.id)"
        ></el-image>
        <span>{{ item.name }}</span>
        <br />
        <span>{{ item.artist.name }}</span>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, next"
      @prev-click="prePage()"
      @next-click="nextPage()"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "@/assets/js/axios.js";
export default {
  data() {
    return {
      allNewDisc: [],
      pageIndex: 0,
    };
  },
  created() {
    this.getAllNewDisc();
  },
  watch: {
    pageIndex(newVal, oldVal) {
      this.getAllNewDisc();
    },
  },
  methods: {
    getAllNewDisc() {
      axios({
        url: "album/new",
        method: "post",
        params: {
          offset: this.pageIndex * 35,
          limit: 35,
          area: "ZH",
        },
      })
        .then((res) => {
          this.allNewDisc = res.data.albums;
        })
        .catch((err) => {});
    },
    toSongList(id) {
      this.$router.push("/AlbumDetail/" + id);
    },
    prePage() {
      this.pageIndex = this.pageIndex - 1;
    },
    nextPage() {
      this.pageIndex = this.pageIndex + 1;
    },
  },
};
</script>

<style lang="less" scoped>
@import "/src/assets/css/main/findMusic/newDsic/new-music.less";
</style>

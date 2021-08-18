
<template>
  <div class="singer-msg">
    <el-main>
      <div class="title">
        <el-row>
          <el-col :span="5" class="play"
            ><el-button @click="toPlayAll()">播放</el-button></el-col
          >
          <el-col :span="5" class="add"
            ><el-button @click="toAdd()">加入</el-button></el-col
          >
        </el-row>
      </div>
      <div class="song">
        <el-table
          :data="hotMusic"
          style="width: 100%"
          @current-change="handleCurrentChange"
          @row-click="toSongList"
        >
          <el-table-column type="index" width="80px"> </el-table-column>
          <el-table-column prop="name" label="标题" width="330px">
          </el-table-column>
          <el-table-column prop="dt" label="时长" width="80px">
          </el-table-column>
          <el-table-column prop="al.name" label="专辑" width="150px">
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </div>
</template>

<script>
import axios from "@/assets/js/axios.js";
export default {
  data() {
    return {
      hotMusic: [],
    };
  },
  created() {
    this.getHotMusic();
    this.getUpDate();
  },
  mounted() {},
  methods: {
    getHotMusic() {
      axios({
        url: "artist/top/song",
        method: "post",
        params: {
          id: this.$route.params.id,
        },
      })
        .then((res) => {
          this.hotMusic = res.data.songs;
          this.hotMusic.forEach((item) => {
            const dt = new Date(item.dt);
            const mm = (dt.getMinutes() + "").padStart(2, "0");
            const ss = (dt.getSeconds() + "").padStart(2, "0");
            item.dt = mm + ":" + ss;
          });
        })
        .catch((err) => {});
    },
    toSongList(row) {
      this.$store.commit("setCommentId", ["music", row.id]);
      this.$router.push("/PlayDetail/" + row.id);
    },
    toPlayAll() {
      alert(1);
      this.hotMusic.forEach((item) => {
        this.$store.commit("addSongList", item);
      });
      this.$store.commit("setCurId", this.hotMusic[0].id);
    },
    toAdd() {
      alert(1);
      this.hotMusic.forEach((item) => {
        this.$store.commit("addSongList", item);
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "/src/assets/css/main/findMusic/singer/singer-ab.less";
</style>


<!--  -->
<template>
  <el-container>
    <el-main>
      <el-image :src="rankDetail.coverImgUrl"></el-image>
      <div class="title">
        <el-row style="300px">
          <el-col class="rank-name"
            ><span>{{ rankDetail.name }}</span></el-col
          >
        </el-row>
        <el-row>
          <el-col class="up-time"
            ><span
              >最近更新：{{
                rankDetail.updateTime | dateFormatToYMD
              }}（每天更新）</span
            ></el-col
          >
        </el-row>
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
        <el-row>
          <el-col :span="3">歌曲列表</el-col>
          <el-col :span="3">{{ rankDetail.tracks.length }}首歌</el-col>
          <el-col :span="6" :offset="4"
            >播放{{ rankDetail.playCount }}次</el-col
          >
        </el-row>

        <el-table
          :data="rankDetail.tracks"
          style="width: 100%"
          @current-change="handleCurrentChange"
          @row-click="toSongList"
        >
          <el-table-column type="index" width="80px"> </el-table-column>
          <el-table-column prop="name" label="标题" width="330px">
          </el-table-column>
          <el-table-column prop="dt" label="时长" width="80px">
          </el-table-column>
          <el-table-column prop="ar.0.name" label="歌手" width="150px">
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from "@/assets/js/axios.js";
export default {
  data() {
    return {
      rankDetail: [],
    };
  },
  created() {
    this.getRankDetail();
    this.getUpDate();
  },
  mounted() {},
  methods: {
    getRankDetail() {
      axios({
        url: "playlist/detail",
        method: "post",
        params: {
          id: this.$route.params.id,
        },
      })
        .then((res) => {
          this.rankDetail = res.data.playlist;
          this.rankDetail.tracks.forEach((item) => {
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
      this.rankDetail.tracks.forEach((item) => {
        this.$store.commit("addSongList", item);
      });
      this.$store.commit("setCurId", this.rankDetail.tracks[0].id);
    },
    toAdd() {
      this.rankDetail.tracks.forEach((item) => {
        this.$store.commit("addSongList", item);
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "/src/assets/css/main/findMusic/songList/song-list-detail.less";
</style>

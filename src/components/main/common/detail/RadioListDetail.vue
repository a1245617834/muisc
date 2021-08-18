<template>
  <el-container>
    <el-main>
      <el-image :src="radioListDetail[0].coverUrl"></el-image>
      <div class="title">
        <el-row style="300px">
          <el-col class="rank-name"
            ><span>{{ radioListDetail[0].dj.brand }}</span></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="5" class="play"><el-button>播放</el-button></el-col>
          <el-col :span="5" class="add"><el-button>加入</el-button></el-col>
        </el-row>
      </div>
      <div class="song">
        <el-row>
          <el-col :span="3">节目列表</el-col>
          <el-col :span="3">共{{ radioListDetail.length }}期</el-col>
        </el-row>

        <el-table
          :data="radioListDetail"
          style="width: 100%"
          @current-change="handleCurrentChange"
          @row-click="toSongList"
        >
          <el-table-column type="index" width="80px"> </el-table-column>
          <el-table-column prop="name" label="标题" width="330px">
          </el-table-column>
          <el-table-column prop="duration" label="时长" width="80px">
          </el-table-column>
          <el-table-column prop="listenerCount" label="播放量" width="150px">
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
      radioListDetail: [],
    };
  },
  created() {
    this.getRadioListDetail();
    this.getUpDate();
  },
  methods: {
    getRadioListDetail() {
      axios({
        url: "dj/program",
        method: "post",
        params: {
          rid: this.$route.params.id,
        },
      })
        .then((res) => {
          this.radioListDetail = res.data.programs;
          this.radioListDetail.forEach((item) => {
            const duration = new Date(item.duration);
            const mm = (duration.getMinutes() + "").padStart(2, "0");
            const ss = (duration.getSeconds() + "").padStart(2, "0");
            item.duration = mm + ":" + ss;
          });
        })
        .catch((err) => {});
    },
    toSongList(row) {
      this.$router.push("/RadioPlay/" + row.id);
      this.$store.commit("setCommentId", ["radio", row.id]);
    },
  },
};
</script>

<style lang="less" scoped>
@import "/src/assets/css/main/findMusic/songList/song-list-detail.less";
</style>
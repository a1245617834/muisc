
<template>
  <el-container style="width: 1000px">
    <el-aside style="width: 250px">
      <div>
        <span class="title">云音乐特色榜</span>
        <el-row
          :offset="item === 1 || item === 4 ? 2 : 1"
          v-for="(item, index) in musicRankList.slice(0,4)"
          :key="index"
        >
          <el-col
            :span="24"
            @click.native="toRankType(item.id)"
          >
            <el-image :src="item.coverImgUrl"></el-image>
            <span>{{ item.name }}</span>
          </el-col>
        </el-row>
      </div>
      <div>
        <span>全球榜</span>
        <el-row
          :offset="item === 1 || item === 4 ? 2 : 1"
          v-for="(item, index) in musicRankList.slice(4)"
          :key="index"
        >
          <el-col :span="24" @click.native="toRankType(item.id)">
            <el-image :src="item.coverImgUrl"></el-image>
            <span>{{ item.name }}</span>
          </el-col>
        </el-row>
      </div>
    </el-aside>
    <el-main style="width: 750px">
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
          <el-col :span="5" class="play"><el-button>播放</el-button></el-col>
          <el-col :span="5" class="add"><el-button>加入</el-button></el-col>
          <el-col :span="5" class="share"><el-button>分享</el-button></el-col>
          <el-col :span="4" class="download"
            ><el-button>下载</el-button></el-col
          >
          <el-col :span="5" class="comment"><el-button>评论</el-button></el-col>
        </el-row>
      </div>
      <div class="song">
        <el-row>
          <el-col :span="3">歌曲列表</el-col>
          <el-col :span="3">{{ rankDetail.trackCount }}首歌</el-col>
          <el-col :span="6" :offset="4"
            >播放{{ rankDetail.playCount }}次</el-col
          >
        </el-row>

        <el-table
          :data="rankDetail.tracks"
          style="width: 100%"
          
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
  name: "MusicRank",
  data() {
    return {
      musicRankList: [],
      rankDetail: [],
      rankTypeId: "19723756",
    };
  },
  created() {
    this.getOfficiaRankList();
    this.getRankDetail();
  },
  watch: {
    rankTypeId(newVal, oldVal) {
      this.getRankDetail();
    },
  },
  methods: {
    getOfficiaRankList() {
      axios({
        url: "toplist/detail",
        method: "post",
      })
        .then((res) => {
          this.musicRankList = res.data.list;
        })
        .catch((err) => {});
    },
    getRankDetail() {
      axios({
        url: "playlist/detail",
        method: "post",
        params: {
          id: this.rankTypeId,
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
    toRankType(id) {
      this.rankTypeId = id;
    },
    toSongList(row) {
      this.$router.push("/PlayDetail/" + row.id);
    },
  },
};
</script>

<style lang="less" scoped>
@import "/src/assets/css/main/findMusic/rank/rank.less";
@import "/src/assets/css/main/findMusic/songList/song-list-detail.less";
</style>
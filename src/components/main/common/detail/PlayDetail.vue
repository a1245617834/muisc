<!--  -->
<template>
  <el-container>
    <el-aside>
      <el-image :src="songDetail[0].al.picUrl"></el-image>
      <el-row v-for="(item, index) in lrcs" :key="index">
        <span>{{ item }}</span>
      </el-row>
    </el-aside>
    <el-main>
      <el-row>
        <el-col class="song">
          <span>{{ songDetail[0].name }}</span>
        </el-col>
      </el-row>
      <el-row
        ><el-col class="singer"
          ><span>歌手: {{ songDetail[0].ar[0].name }}</span></el-col
        ></el-row
      >
      <el-row
        ><el-col class="singer"
          ><span>所属专辑: {{ songDetail[0].al.name }}</span></el-col
        ></el-row
      >
      <el-row>
        <el-row class="btn-list">
          <el-col :span="4"
            ><el-button @click="toPlay()">播放</el-button></el-col
          >
          <el-col :span="3"
            ><el-button @click="toCollection()">收藏</el-button></el-col
          >
          <el-col :span="3"
            ><el-button @click="toShare()">分享</el-button></el-col
          >
          <el-col :span="3"
            ><el-button @click="toDownload()">下载</el-button></el-col
          >
          <el-col :span="4"
            ><el-button @click="toComment()">评论</el-button></el-col
          >
        </el-row>
      </el-row>
      <el-row> 评论 </el-row>
      <el-divider></el-divider>
      <div>
        <el-row>
          <el-col :offset="1" :span="2">
            <el-image v-if="cookie" :src="avatarUrl"></el-image>
            <el-image v-else src="/imgs/tourist.png"></el-image>
          </el-col>
          <el-col :offset="1" :span="20">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="请输入内容"
              v-model="commentContent"
              show-word-limit
              resize="none"
              ref="commentArea"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row class="comment-action">
          <el-col :offset="20" :span="4"
            ><span>{{ commentCount }}</span
            ><el-button @click="comment()">评论</el-button></el-col
          >
        </el-row>
      </div>
      <div class="comment">
        <router-view></router-view>
      </div>
      <el-row class="download" ref="download">
        <el-image src="/imgs/download.png"></el-image>
        <el-button @click="close()"></el-button>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import axios from "@/assets/js/axios.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      musicId: this.$route.params.id,
      songDetail: [],
      lrc: [],
      lrcs: [],
      musicUrl: [],
      commentContent: "",
      commentCount: 140,
    };
  },
  computed: {
    ...mapGetters(["cookie", "avatarUrl"]),
  },
  created() {
    this.getSongDetail();
    this.getLrc();
  },
  methods: {
    getSongDetail() {
      axios({
        url: "song/detail",
        method: "post",
        params: {
          ids: this.musicId,
        },
      })
        .then((res) => {
          this.songDetail = res.data.songs;
          this.songDetail.forEach((item) => {
            const dt = new Date(item.dt);
            const mm = (dt.getMinutes() + "").padStart(2, "0");
            const ss = (dt.getSeconds() + "").padStart(2, "0");
            item.dt = mm + ":" + ss;
          });
        })
        .catch((err) => {});
    },
    getLrc() {
      axios({
        url: "/lyric",
        method: "post",
        params: {
          id: this.musicId,
        },
      })
        .then((res) => {
          this.lrc = res.data.lrc.lyric.split('\n');
          this.lrc.forEach((item) => {
            const t = item.slice(12)
            this.lrcs.push(t)
          })
        })
        .catch((err) => {});
    },
    toPlay() {
      this.songDetail.forEach((item) => {
        this.$store.commit("addSongList", item);
        this.$store.commit("setCurId", this.musicId);
      });
    },
    toCollection() {
      axios({
        url: "like",
        method: "post",
        params: {
          id: this.musicId,
          
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            alert(res);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    toShare() {
      if (this.cookie !== null) {
        axios({
          url: "share/resource",
          method: "post",
          params: {
            id: this.musicId,
            type: "song",
            msg: "好好好",
            cookie: this.cookie,
          },
        })
          .then((res) => {})
          .catch((err) => {});
      } else {
        alert("用户未登录，请先登录");
      }
    },
    toDownload() {
      this.$refs.download.$el.style.display = "block";
    },
    close() {
      this.$refs.download.$el.style.display = "none";
    },
    toComment() {
      this.$refs.commentArea.focus();
    },
    comment() {
      axios({
        url: "comment",
        method: "post",
        params: {
          t: 1,
          type: 0,
          id: this.musicId,
          content: this.commentContent,
          cookie: this.cookie,
        },
      }).then((res) => {
        this.commentContent = "";
      });
    },
  },
};
</script> 

<style lang="less" scoped>
@import "/src/assets/css/main/common/detail/play-detail.less";
</style>

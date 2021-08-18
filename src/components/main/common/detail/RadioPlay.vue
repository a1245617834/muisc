<!--  -->
<template>
  <el-container>
    <el-aside>
      <el-image :src="radioDetail.coverUrl"></el-image>
    </el-aside>
    <el-main>
      <el-row>
        <el-col class="song">
          <span>{{ radioDetail.name }}</span>
        </el-col>
      </el-row>
      <el-row
        ><el-col class="singer"
          ><span>{{ radioDetail.radio.name }}</span></el-col
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
        <el-row>
          <el-col
            >{{ radioDetail.radio.name }} 第{{
              radioDetail.serialNum
            }}期</el-col
          >
          <el-col
            >{{
              radioDetail.scheduledPublishTime | dateFormatToYMD
            }}创建</el-col
          >
          <el-col>播放{{ radioDetail.listenerCount }}次</el-col>
        </el-row>
        <el-row>
          <el-col></el-col>
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
      </el-row>
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
      radioId: this.$route.params.id,
      radioDetail: [],
      radioUrl: [],
      commentContent: "",
      commentCount: 140,
    };
  },
  created() {
    this.getRadioDetail();
  },
  computed: {
    ...mapGetters(["cookie", "avatarUrl"]),
  },
  watch: {
    userMsg(newVal, oldVal) {
      this.avatarUrl = newVal.profile.avatarUrl;
    },
  },
  methods: {
    getRadioDetail() {
      axios({
        url: "dj/program/detail",
        method: "post",
        params: {
          id: this.radioId,
        },
      })
        .then((res) => {
          this.radioDetail = res.data.program;
        })
        .catch((err) => {});
    },
    toPlay() {
      this.$store.commit("addSongList", this.radioDetail);
      this.$store.commit("setCurId", this.radioDetail.id);
    },
    toShare() {
      if (this.cookie !== null) {
        axios({
          url: "share/resource",
          method: "post",
          params: {
            id: this.radioId,
            type: "djprogram",
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
          type: 4,
          id: this.radioId,
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

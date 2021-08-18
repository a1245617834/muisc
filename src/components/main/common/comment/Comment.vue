<!--  -->
<template>
  <el-container>
    <el-header> </el-header>
    <el-main>
      <el-row>
        <el-col>精彩评论</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row v-for="(item, index) in hotCommentList" :key="index">
        <el-row>
          <el-col :span="3">
            <el-image :src="item.user.avatarUrl"></el-image>
          </el-col>
          <el-col :span="20">
            <span class="discolor">{{ item.user.nickname }}：</span>
            <span>{{ item.content }}</span>
          </el-col>
        </el-row>
        <el-row class="msg">
          <el-col :offset="3" :span="6">
            <span>{{ item.time | dateFormatToYMD }}</span>
          </el-col>
          <el-col :offset="10" :span="2"><el-button>点赞</el-button></el-col>
          <el-col :span="2"><span class="reply">回复</span></el-col>
        </el-row>
        <el-divider></el-divider>
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
      hotCommentList: [],
      commentUrl: "",
    };
  },
  created() {
    this.getCommentList();
    this.getCurCommentId();
    this.getCommentUrl();
  },
  computed: {
    ...mapGetters(["commentId", "userMsg"]),
  },
  watch: {
    commentId(newVal, oldVal) {
      alert(newVal);
      this.getCommentList(newVal);
    },
  },
  methods: {
    getCommentList(newVal) {
      if (this.commentId.type === "music") {
        axios({
          url: "comment/music",
          method: "post",
          params: {
            id: this.commentId.comId,
          },
        })
          .then((res) => {
            this.hotCommentList = res.data.hotComments;
          })
          .catch((err) => {});
      } else if (this.commentId.type === "mv") {
        axios({
          url: "comment/mv",
          method: "post",
          params: {
            id: this.commentId.comId,
          },
        })
          .then((res) => {
            this.hotCommentList = res.data.hotComments;
          })
          .catch((err) => {});
      } else if (this.commentId.type === "radio") {
        axios({
          url: "comment/dj",
          method: "post",
          params: {
            id: this.commentId.comId,
          },
        })
          .then((res) => {
            this.hotCommentList = res.data.comments;
          })
          .catch((err) => {});
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "/src/assets/css/main/common/comment/comment.less";
</style>

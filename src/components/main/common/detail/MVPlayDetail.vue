
<template>
  <div class="singer-mv">
    <el-row>
      <el-col>{{ mvDetail.name }}</el-col>
      <el-col
        >{{ mvDetail.artists[0].name }}/{{ mvDetail.artists[1].name }}</el-col
      >
    </el-row>
    <div class="mv-player">
      <video :src="mvUrl" autoplay controls></video>
    </div>
    <el-row>
      <el-col
        ><el-button @click="toReward()"
          >点赞({{ mvDetail.shareCount }})</el-button
        ></el-col
      >
      <el-col
        ><el-button @click="toCollection()"
          >收藏({{ mvDetail.subCount }})</el-button
        ></el-col
      >
      <el-col
        ><el-button @click="toShare()"
          >分享({{ mvDetail.shareCount }})</el-button
        ></el-col
      >
    </el-row>
    <el-row>
      <el-col>MV简介</el-col>
      <el-col>发布时间：{{ mvDetail.publishTime }}</el-col>
      <el-col>播放次数：{{ mvDetail.playCount }}次</el-col>
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
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from "@/assets/js/axios.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      mvUrl: [],
      mvDetail: [],
      commentContent: "",
      commentCount: 140,
    };
  },
  created() {
    this.getMvUrl();
    this.getMvDetail();
  },
  computed: {
    ...mapGetters(["cookie", "avatarUrl"]),
  },
  methods: {
    getMvUrl() {
      axios({
        url: "mv/url",
        method: "post",
        params: {
          id: this.$route.params.id,
        },
      })
        .then((res) => {
          this.mvUrl = res.data.data.url;
        })
        .catch((err) => {});
    },
    getMvDetail() {
      axios({
        url: "mv/detail",
        method: "post",
        params: {
          mvid: this.$route.params.id,
        },
      })
        .then((res) => {
          this.mvDetail = res.data.data;
        })
        .catch((err) => {});
    },
    toShare() {
      if (this.cookie !== null) {
        axios({
          url: "share/resource",
          method: "post",
          params: {
            id: this.$route.params.id,
            type: "mv",
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
    comment() {
      axios({
        url: "comment",
        method: "post",
        params: {
          t: 1,
          type: 1,
          id: this.$route.params.id,
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
@import "/src/assets/css/main/findMusic/singer/singer-play-mv.less";
</style>


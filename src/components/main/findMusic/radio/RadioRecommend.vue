<!--  -->
<template>
  <div>
    <div class="radio-list">
      <el-row class="title">
        <el-col :span="8">推荐节目</el-col>
        <el-col :offset="12" :span="4">更多</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row
        class="chose"
        v-for="(item, index) in radioRecommend"
        :key="index"
        @click.native="toRadioPlay(item.id)"
      >
        <el-col>
          <el-image :src="item.coverUrl"></el-image>
          <div>
            <span>{{ item.name }}</span>
            <br />
            <span>{{ item.dj.brand }}</span>
          </div>
          <span class="radioer">{{
            item.radio.category
          }}</span>
        </el-col>
      </el-row>
    </div>
    <div class="radio-list">
      <el-row class="title">
        <el-col :span="8">节目排行榜</el-col>
        <el-col :offset="12" :span="4">更多</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row
        class="chose"
        v-for="(item, index) in radioRank.slice(0,10)"
        :key="index"
        @click.native="toRadioPlay(item.program.id)"
      >
        <el-col>
          <div class="index">
            <span>{{ item.rank}}</span>
          </div>
          <el-image :src="item.program.coverUrl"></el-image>
          <div>
            <span>{{ item.program.description }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="radio-re-list" v-for="(item, index) in musicSim" :key="index">
      <el-row class="title">
        <el-col :span="4">{{ item[0].category }}·电台</el-col>
        <el-col :offset="18" :span="2">更多</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class="content">
        <el-col
          :span="12"
          v-for="(dItem, dIndex) in item.slice(0, 4)"
          :key="dIndex"
        >
          <el-image
            :src="dItem.picUrl"
            @click="toRadioListDetail(dItem.id)"
          ></el-image>
          <div>
            <span @click="toRadioListDetail(dItem.id)">{{ dItem.name }}</span>
            <br />
            <span>{{ dItem.rcmdtext }}</span>
          </div>
        </el-col>
        <el-divider></el-divider>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "@/assets/js/axios.js";
export default {
  data() {
    return {
      radioRank: [],
      radioRecommend: [],
      musicSim: [],
      list: [2, 6, 5, 3, 2001, 11],
    };
  },
  created() {
    this.getRadioRank();
    this.getRadioRecommend();
    this.getMusicSim(this.list);
  },
  methods: {
    getRadioRank() {
      axios({
        url: "dj/program/toplist",
        method: "post",
      })
        .then((res) => {
          this.radioRank = res.data.toplist;
        })
        .catch((err) => {});
    },
    getRadioRecommend() {
      axios({
        url: "program/recommend",
        method: "post",
      })
        .then((res) => {
          this.radioRecommend = res.data.programs;
        })
        .catch((err) => {});
    },
    getMusicSim(list) {
      for (let num1 in list) {
        axios({
          url: "dj/recommend/type",
          method: "post",
          params: {
            limit: 4,
            type: list[num1],
          },
        })
          .then((res) => {
            this.musicSim[num1] = res.data.djRadios;
          })
          .catch((err) => {});
      }
    },
    toRadioListDetail(id) {
      this.$router.push("/RadioListDetail/" + id);
    },
    toRadioPlay(id) {
      this.$store.commit("setCommentId", ["radio", id]);
      this.$router.push("/RadioPlay/" + id);
    },
  },
};
</script>

<style lang = "less" scoped >
@import "/src/assets/css/main/findMusic/radio/radio.less";
</style>

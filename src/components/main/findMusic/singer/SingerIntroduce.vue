
<template>
  <el-container>
    <el-main>
      <el-row>
        <span class="title">简介</span>
        <el-col class="simple">
          <span>{{ singerIntr.briefDesc }}</span>
        </el-col>
      </el-row>
      <el-row>
        <span class="title">{{ singerIntr.introduction[0].ti }}</span>
        <el-col v-for="(item, index) in descList" :key="index">
          <span>{{ item }}</span>
        </el-col>
      </el-row>
      <el-row>
        <span class="title">{{ singerIntr.introduction[1].ti }}</span>
        <el-col v-for="(item, index) in impList" :key="index">
          <span>{{ item }}</span>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import axios from "@/assets/js/axios.js";
export default {
  data() {
    return {
      singerIntr: [],
      descList: [],
      impList: [],
    };
  },
  created() {
    this.getSingIntr();
    this.getUpDate();
  },
  mounted() {},
  methods: {
    getSingIntr() {
      axios({
        url: "artist/desc",
        method: "post",
        params: {
          id: this.$route.params.id,
        },
      })
        .then((res) => {
          this.singerIntr = res.data;
          this.descList = this.singerIntr.introduction[0].txt.split("\n");
          this.impList = this.singerIntr.introduction[1].txt.split("\n");
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
@import "/src/assets/css/main/findMusic/singer/singer-intr.less";
</style>

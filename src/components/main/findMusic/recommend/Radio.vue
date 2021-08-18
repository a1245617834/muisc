<template>
  <el-container>
    <el-header style="height: 300px">
      <el-row>
        <el-col :span="3" v-for="(item, index) in radioList" :key="index">
          <el-image :src="item.pic56x56Url"></el-image>
          <span>{{ item.name }}</span>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import axios from "@/assets/js/axios.js";
export default {
  data() {
    return {
      radioList: [],
    };
  },
  created() {
    this.getRadioList();
  },
  methods: {
    getRadioList() {
      axios({
        url: "dj/catelist",
        method: "post",
      })
        .then((res) => {
          this.radioList = res.data.categories;
          
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang = "less" scoped >
@import "/src/assets/css/main/findMusic/radio/radio.less";
</style>
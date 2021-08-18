<!--  -->
<template>
  <el-row>
    <el-col
      v-for="(item, index) in MV"
      :key="index"
      @click.native="toMVPlayDetail(item.id)"
    >
      <el-image :src="item.imgurl"></el-image>
      <span>{{ item.name }}</span>
    </el-col>
  </el-row>
</template>

<script>
import axios from "@/assets/js/axios.js";
export default {
  data() {
    return {
      MV: [],
    };
  },
  created() {
    this.getMV();
    this.getUpDate();
  },
  mounted() {},
  methods: {
    getMV() {
      axios({
        url: "artist/mv",
        method: "post",
        params: {
          id: this.$route.params.id,
          limit: 12,
        },
      })
        .then((res) => {
          this.MV = res.data.mvs;
        })
        .catch((err) => {});
    },
    toMVPlayDetail(id) {
      this.$router.push("/MVPlayDetail/" + id);
      this.$store.commit("setCommentId", ["mv", id]);
    },
  },
};
</script>

<style lang="less" scoped>
@import "/src/assets/css/main/common/mv/desc-mv.less";
</style>

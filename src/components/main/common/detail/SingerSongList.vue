<template>
  <el-container>
      <el-header>
            <el-image :src="singerImg"></el-image>
            <el-menu router
            mode="horizontal"
                :default-active="$route.path">
                <el-menu-item :index="/SingerHotMusic/+`${this.singerId}`">热门作品</el-menu-item>
                <el-menu-item :index="/SingerAllMusic/+`${this.singerId}`">所有专辑</el-menu-item>
                <el-menu-item :index="/SingerMV/+`${this.singerId}`">相关MV</el-menu-item>
                <el-menu-item :index="/SingerIntroduce/+`${this.singerId}`">艺人介绍</el-menu-item>
            </el-menu>
     </el-header>
     <el-main>
         <router-view></router-view>
     </el-main>
  </el-container>
</template>

<script>
import axios from "@/assets/js/axios.js";
export default {
    data(){
        return{
            singerId: this.$route.params.id,
            singerImg: []
        }
    },
    created() {
        this.getSingerImg()
    },
    methods: {
        getSingerImg() {
            axios({
                url: "artists",
                method: "post",
                params: {
                   id: this.singerId
                }
            })
            .then((res) => {
                this.singerImg = res.data.artist.img1v1Url;
            })
            .catch((err) => {});
        },
    }
}
</script>

<style lang="less" scoped>
@import "/src/assets/css/main/findMusic/singer/singer-ab.less";
</style> 
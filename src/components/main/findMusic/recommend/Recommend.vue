<!--  -->
<template>
  <el-container>
    <el-header style="height: 285px">
      <el-carousel type="card" arrow="always">
        <el-carousel-item v-for="(item, index) in bannerInfo" :key="index">
          <el-image class="carPic" :src="item.imageUrl"></el-image>
        </el-carousel-item>
      </el-carousel>
      <el-row class="left-mask"></el-row>
      <el-col class="download"
        ><el-image src="/imgs/download-home.png"></el-image
      ></el-col>
      <el-row class="right-mask"></el-row>
    </el-header>
    <el-main>
      <el-container>
        <div class="content-re">
          <div class="hot-re">
            <div class="title">
              <span>热门推荐</span>
              <el-menu :router="true" mode="horizontal">
                <el-menu-item index="/SongList">华语</el-menu-item>
                <el-menu-item index="/SongList">流行</el-menu-item>
                <el-menu-item index="/SongList">摇滚</el-menu-item>
                <el-menu-item index="/SongList">民谣</el-menu-item>
                <el-menu-item index="/SongList">电子</el-menu-item>
              </el-menu>
            </div>
            <el-divider></el-divider>
            <el-row>
              <el-col
                :span="6"
                v-for="(item, index) in personal"
                :key="index"
                @click.native="toSongList(item.id)"
              >
                <el-image :src="item.picUrl"></el-image>
                <p>{{ item.name }}</p>
              </el-col>
            </el-row>
          </div>
          <div class="new-re">
            <div class="title">
              <span>新碟上架</span>
            </div>
            <el-divider></el-divider>
            <el-row :gutter="10">
              <el-col
                :span="4"
                v-for="(item, index) in newDisc.slice(0, 5)"
                :key="index"
                @click.native="toAlbumDetail(item.id)"
              >
                <el-image :src="item.picUrl"> </el-image>
                <p>{{ item.name }}</p>
                <p>{{ item.artist.name }}</p>
              </el-col>
            </el-row>
          </div>
          <div class="rank">
            <div class="title">
              <span>榜单</span>
            </div>
            <el-divider></el-divider>
            <el-row>
              <el-col
                :span="8"
                :offset="item === 1 || item === 4 ? 2 : 1"
                v-for="item in 3"
                :key="item"
              >
                <el-image :src="musicRankList[item - 1].coverImgUrl"></el-image>
                <el-table
                  :data="musicRankList[item - 1].tracks"
                  stripe
                  :show-header="false"
                  border
                >
                  <el-table-column type="index">
                    <template scope="scope">
                      <span>{{ scope.$index + 1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="first"> </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="content-user">
          <div class="hot-singer">
            <el-row>
              <el-col>
                <span style="background-color: #ffffff; font-size: 18px"
                  >热门歌手</span
                >
                <el-divider></el-divider>
              </el-col>
              <el-row
                v-for="(item, index) in hotSinger"
                :key="index"
                @click.native="toSingerSongList(item.id)"
              >
                <el-col style="width: 50px">
                  <el-image :src="item.img1v1Url"></el-image>
                </el-col>
                <el-col :span="18">
                  <span>{{ item.name }}</span>
                </el-col>
              </el-row>
            </el-row>
          </div>
          <div class="hot-radioer">
            <el-row>
              <el-col>
                <span>热门主播</span>
                <el-divider></el-divider>
              </el-col>
              <el-row v-for="(item, index) in hotDj" :key="index">
                <el-col :span="2">
                  <el-image :src="item.avatarUrl"></el-image>
                </el-col>
                <el-col :span="16">
                  <span>{{ item.nickName }}</span>
                </el-col>
              </el-row>
            </el-row>
          </div>
        </div>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import axios from "@/assets/js/axios.js";
import { mapGetters } from "vuex";
export default {
  name: "Recommend",
  data() {
    return {
      bannerInfo: [],
      personal: [],
      newDisc: [],
      musicRankList: [
        {
          coverImgUrl: "",
        },
        {
          coverImgUrl: "",
        },
        {
          coverImgUrl: "",
        },
      ],
      hotSinger: [],
      hotDj: [],
    };
  },
  created() {
    this.getBannerInfo();
    this.getPersonal();
    this.getNewDisc();
    this.getOfficiaRankList();
    this.getHotSinger();
    this.getHotDj();
  },
  computed: {
    ...mapGetters["userMsg"],
  },
  methods: {
    getBannerInfo() {
      axios({
        url: "banner",
        method: "post",
      })
        .then((res) => {
          this.bannerInfo = res.data.banners;
        })
        .catch((err) => {});
    },
    getPersonal() {
      axios({
        url: "personalized",
        method: "post",
        params: {
          limit: 8,
        },
      })
        .then((res) => {
          this.personal = res.data.result;
        })
        .catch((err) => {});
    },
    getNewDisc() {
      axios({
        url: "album/newest",
        method: "post",
        params: {
          limit: 10,
        },
      })
        .then((res) => {
          this.newDisc = res.data.albums;
        })
        .catch((err) => {});
    },
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
    getHotSinger() {
      axios({
        url: "top/artists",
        method: "post",
        params: {
          limit: 5,
        },
      })
        .then((res) => {
          this.hotSinger = res.data.artists;
        })
        .catch((err) => {});
    },
    getHotDj() {
      axios({
        url: "dj/toplist/popular",
        method: "post",
        params: {
          limit: 5,
        },
      })
        .then((res) => {
          this.hotDj = res.data.data.list;
        })
        .catch((err) => {});
    },
    toSongList(id) {
      this.$router.push("/SongListDetail/" + id);
    },
    toAlbumDetail(id) {
      this.$router.push("/AlbumDetail/" + id);
    },
    toSingerSongList(id) {
      this.$router.push("/SingerSongList/" + id);
    },
  },
};
</script>

<style lang="less" scoped>
@import "/src/assets/css/main/findMusic/recommend/recommend.less";
</style>

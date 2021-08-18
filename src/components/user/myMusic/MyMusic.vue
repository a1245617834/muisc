<template>
  <div style="background-color: #f5f5f5">
    <el-container>
      <el-aside>
        <el-menu>
          <el-menu-item @click.native="changeCollType('artist/sublist')"
            >我的歌手({{ userListMsg.artistCount }})</el-menu-item
          >
          <el-menu-item @click.native="changeCollType('dj/sublist')"
            >我的电台({{ userListMsg.djRadioCount }})</el-menu-item
          >
          <el-menu-item-group>
            <span>创建的歌单({{ userListMsg.createdPlaylistCount }})</span>
            <el-menu-item
              v-for="(item, index) in userSongList.slice(
                0,
                userListMsg.createdPlaylistCount
              )"
              :key="index"
              @click.native="changeListId(item.id)"
            >
              <el-image :src="item.coverImgUrl"></el-image>
              <span>{{ item.name }}</span>

              <span>{{ item.trackCount }}首</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <span>收藏的歌单({{ userListMsg.subPlaylistCount }})</span>
            <el-menu-item
              v-for="(item, index) in userSongList.slice(
                userListMsg.createdPlaylistCount
              )"
              :key="index"
              @click.native="changeListId(item.id)"
            >
              <el-image :src="item.coverImgUrl"></el-image>
              <div style="display: inline-block">
                <span>{{ item.name }}</span>

                <span>{{ item.trackCount }}首</span>
              </div>
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="song-list" ref="songList">
          <el-image :src="rankDetail.coverImgUrl"></el-image>
          <div class="title">
            <el-row style="300px">
              <el-col class="rank-name"
                ><span>{{ rankDetail.name }}</span></el-col
              >
            </el-row>
            <el-row>
              <el-col class="up-time"
                ><span
                  >最近更新：{{
                    rankDetail.updateTime | dateFormatToYMD
                  }}（每天更新）</span
                ></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="5" class="play"
                ><el-button @click="toPlayAll()">播放</el-button></el-col
              >
              <el-col :span="5" class="add"
                ><el-button @click="toAdd()">加入</el-button></el-col
              >
              <el-col :span="4" class="download"
                ><el-button>下载</el-button></el-col
              >
            </el-row>
          </div>
          <div class="song">
            <el-row>
              <el-col :span="3">歌曲列表</el-col>
              <el-col :span="3">{{ rankDetail.tracks.length }}首歌</el-col>
              <el-col :span="6" :offset="4"
                >播放{{ rankDetail.playCount }}次</el-col
              >
            </el-row>
            <el-table
              :data="rankDetail.tracks"
              style="width: 100%"
              @current-change="handleCurrentChange"
              @row-click="toSongList"
            >
              <el-table-column type="index" width="80px"> </el-table-column>
              <el-table-column prop="name" label="标题" width="330px">
              </el-table-column>
              <el-table-column prop="dt" label="时长" width="80px">
              </el-table-column>
              <el-table-column prop="ar.0.name" label="歌手" width="150px">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="my-collection" ref="myCollection">
          <el-row>
            <el-col>我的歌手</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row v-for="(item, index) in collectionDetail" :key="index">
            <el-col :span="3"><el-image :src="item.picUrl"></el-image></el-col>
            <el-col :span="21">{{ item.name }}</el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "@/assets/js/axios.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userListMsg: [],
      rankDetail: [],
      collectionDetail: [],
      collUrl: "/dj/sublist",
    };
  },
  created() {
    this.getUserMsg();
    this.getUserSongList();
    this.getRankDetail();
  },
  computed: {
    ...mapGetters(["userMsg", "token", "userSongList", "songListId"]),
  },
  mounted() {},
  watch: {
    songListId(newVal, oldVal) {
      this.getRankDetail();
    },
    collUrl(newVal, oldVal) {
      this.getMyCollection();
    },
  },
  methods: {
    getUserMsg() {
      axios({
        url: "user/subcount",
        method: "post",
        params: {
          cookie: sessionStorage["cookie"],
        },
      })
        .then((res) => {
          this.userListMsg = res.data;
        })
        .catch((err) => {});
    },
    getUserSongList() {
      axios({
        url: "user/playlist",
        method: "post",
        params: {
          uid: sessionStorage.getItem("userid"),
        },
      })
        .then((res) => {
          this.$store.commit("setUserSongList", res.data.playlist);
          this.$store.commit("setSongListId", res.data.playlist[0].id);
        })
        .catch((err) => {});
    },
    getRankDetail() {
      axios({
        url: "playlist/detail",
        method: "post",
        params: {
          id: this.songListId,
          cookie: sessionStorage["cookie"],
        },
      })
        .then((res) => {
          this.rankDetail = res.data.playlist;
          this.rankDetail.tracks.forEach((item) => {
            const dt = new Date(item.dt);
            const mm = (dt.getMinutes() + "").padStart(2, "0");
            const ss = (dt.getSeconds() + "").padStart(2, "0");
            item.dt = mm + ":" + ss;
          });
        })
        .catch((err) => {});
    },
    changeListId(id) {
      this.$store.commit("setSongListId", id);
      let songList = this.$refs.songList;
      let myCollection = this.$refs.myCollection;
      songList.style.display = "block";
      myCollection.style.display = "none";
    },
    getMyCollection() {
      axios({
        url: this.collUrl,
        method: "post",
        params: {
          cookie: sessionStorage["cookie"],
        },
      })
        .then((res) => {
          if (this.collUrl === "artist/sublist") {
            this.collectionDetail = res.data.data;
            console.log(this.collectionDetail);
          } else {
            this.collectionDetail = res.data.djRadios;
            console.log(this.collectionDetail);
          }
        })
        .catch((err) => {});
    },
    changeCollType(str) {
      this.collUrl = str;
      let songList = this.$refs.songList;
      let myCollection = this.$refs.myCollection;
      songList.style.display = "none";
      myCollection.style.display = "block";
    },
    toSongList(row) {
      this.$store.commit("setCommentId", ["music", row.id]);
      this.$router.push("/PlayDetail/" + row.id);
    },
    toPlayAll() {
      this.rankDetail.tracks.forEach((item) => {
        this.$store.commit("addSongList", item);
      });
      this.$store.commit("setCurId", this.rankDetail.tracks[0].id);
    },
    toAdd() {
      this.rankDetail.tracks.forEach((item) => {
        this.$store.commit("addSongList", item);
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "/src/assets/css/user/my-music.less";
</style> 
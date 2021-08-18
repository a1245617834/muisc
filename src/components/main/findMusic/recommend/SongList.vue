<template>
  <el-container>
    <el-header>
      <span>全部</span>
      <el-dropdown split-button type="primary">
        选择分类
        <el-dropdown-menu slot="dropdown">
          
          
            <el-dropdown-item
              v-for="(item, index) in songListType"
              :key="index"
              style="float: left"
              class="lange"
              @click.native="changeListType(item.name)"
              >{{ item.name }}</el-dropdown-item
            >
          
          
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
      <div class="song-list">
        <el-row>
          <el-col
            v-for="(item, index) in songList"
            :key="index"
            @click.native="toSongListDetail(item.id)"
          >
            <el-image :src="item.coverImgUrl"></el-image>
            <span>{{ item.name }}</span
            ><br />
            <span>{{ item.creator.nickname }}</span>
          </el-col>
        </el-row>
      </div>
      <el-pagination
        background
        layout="prev, next"
        @prev-click="prePage()"
        @next-click="nextPage()"
      >
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
import axios from "@/assets/js/axios.js";
import EDIG from '@/components/main/findMusic/recommend/SongList.vue';
export default {
  data() {
    return {
      songList: [],
      songListType: [],
      songListCat: "",
      pageIndex: 0,
    };
  },
  created() {
    this.getSongList();
    this.getSongListType();
  },
  watch: {
    songListCat(newVal, oldVal) {
      this.getSongList();
    },
    pageIndex(newVal, oldVal) {
      this.getSongList();
    },
  },
  components: {
    EDIG,
  },
  methods: {
    getSongList() {
      axios({
        url: "/top/playlist",
        method: "post",
        params: {
          offset: this.pageIndex * 35,
          limit: 35,
          cat: this.songListCat,
        },
      })
        .then((res) => {
          this.songList = res.data.playlists;
        })
        .catch((err) => {});
    },
    getSongListType() {
      axios({
        url: "playlist/catlist",
        method: "post",
      })
        .then((res) => {
          this.songListType = res.data.sub;
          this.songListType.sub.sort(function (a, b) {
            return a.category - b.category;
          });
        })
        .catch((err) => {});
    },
    toSongListDetail(id) {
      this.$router.push("/SongListDetail/" + id);
    },
    changeListType(cat) {
      this.songListCat = cat;
    },
    prePage() {
      this.pageIndex = this.pageIndex - 1;
    },
    nextPage() {
      this.pageIndex = this.pageIndex + 1;
    },
  },
};
</script>

<style lang="less" scoped>
@import "/src/assets/css/main/findMusic/songList/song-list.less";
</style> 
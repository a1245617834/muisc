<template>
  <div>
    <el-container>
      <el-header>
        <el-input
          placeholder="搜索单曲,歌手,视频,歌单"
          v-model="searchData"
          suffix-icon="el-icon-search"
          @keyup.native.enter="reSearch()"
        >
        </el-input>
      </el-header>
      <el-main>
        <el-menu mode="horizontal" :default-active="activeIndex">
          <el-menu-item index="0" @click.native="changeKey(1, 0)"
            >单曲</el-menu-item
          >
          <el-menu-item index="1" @click.native="changeKey(100, 1)"
            >歌手</el-menu-item
          >
          <el-menu-item index="2" @click.native="changeKey(10, 2)"
            >专辑</el-menu-item
          >
          <el-menu-item index="3" @click.native="changeKey(1004, 3)"
            >视频</el-menu-item
          >
          <el-menu-item index="4" @click.native="changeKey(1006, 4)"
            >歌词</el-menu-item
          >
          <el-menu-item index="5" @click.native="changeKey(1000, 5)"
            >歌单</el-menu-item
          >
          <el-menu-item index="6" @click.native="changeKey(1009, 6)"
            >声音主播</el-menu-item
          >
          <el-menu-item index="7" @click.native="changeKey(1002, 7)"
            >用户</el-menu-item
          >
        </el-menu>
        <div class="result">
          <span>找到{{ searchSingleResult.count }}首单曲</span>
          <el-row
            class="single"
            v-for="(item, index) in searchSingleResult.data"
            :key="index"
          >
            <el-col :span="12" @click.native="toPlayDetail(item.id)">{{
              item.name
            }}</el-col>
            <el-col :span="3" @click.native="toSingerSongList(item.ar[0].id)">{{
              item.ar[0].name
            }}</el-col>
            <el-col :span="6" @click.native="toAlbumDetail(item.al.id)"
              >《{{ item.al.name }}》</el-col
            >
            <el-col :span="3">{{ item.dt }}</el-col>
          </el-row>
        </div>
        <div class="result">
          <span>找到{{ searchSingerResult.count }}个歌手</span>
          <el-row>
            <el-col
              class="singer"
              v-for="(item, index) in searchSingerResult.data"
              :key="index"
            >
              <el-image
                :src="item.img1v1Url"
                @click.native="toSingerSongList(item.id)"
              ></el-image>
              <el-link @click.native="toSingerSongList(item.id)">{{
                item.name
              }}</el-link>
            </el-col>
          </el-row>
        </div>
        <div class="result">
          <span>找到{{ searchAlbumResult.count }}张专辑</span>
          <el-row>
            <el-col
              class="album"
              v-for="(item, index) in searchAlbumResult.data"
              :key="index"
            >
              <el-image
                :src="item.picUrl"
                @click.native="toAlbumDetail(item.id)"
              ></el-image>
              <el-link @click.native="toAlbumDetail(item.id)">{{
                item.name
              }}</el-link>
              <el-link @click.native="toSingerSongList(item.artist.id)">{{
                item.artist.name
              }}</el-link>
            </el-col>
          </el-row>
        </div>
        <div class="result">
          <span>找到{{ searchMVResult.count }}个MV</span>
          <el-row>
            <el-col
              class="mv"
              v-for="(item, index) in searchMVResult.data"
              :key="index"
            >
              <el-image
                :src="item.cover"
                @click.native="toMVPlayDetail(item.id)"
              ></el-image>
              <el-link @click.native="toMVPlayDetail(item.id)">{{
                item.name
              }}</el-link>
              <el-link @click.native="toSingerSongList(item.artists[0].id)">{{
                item.artists[0].name
              }}</el-link>
            </el-col>
          </el-row>
        </div>
        <div class="result">
          <span>找到{{ searchLyricResult.count }}个歌词</span>
          <el-row
            class="lyric"
            v-for="(item, index) in searchLyricResult.data"
            :key="index"
          >
            <el-col :span="12" @click.native="toPlayDetail(item.id)">{{
              item.name
            }}</el-col>
            <el-col :span="4" @click.native="toSingerSongList(item.ar[0].id)">{{
              item.ar[0].name
            }}</el-col>
            <el-col :span="4" @click.native="toAlbumDetail(item.al.id)">{{
              item.al.name
            }}</el-col>
            <el-col :span="4">{{ item.dt }}</el-col>
            <el-col
              :span="24"
              v-for="(litem, lindex) in item.lyrics"
              :key="lindex"
              >{{ litem }}</el-col
            >
          </el-row>
        </div>
        <div class="result">
          <span>找{{ searchSongSheetResult.count }}个歌单</span>
          <el-row
            class="song-sheet"
            v-for="(item, index) in searchSongSheetResult.data"
            :key="index"
          >
            <el-col :span="2"
              ><el-image
                :src="item.coverImgUrl"
                @click.native="toSongListDetail(item.id)"
              ></el-image
            ></el-col>
            <el-col :span="10" @click.native="toSongListDetail(item.id)">{{
              item.name
            }}</el-col>
            <el-col :span="2">{{ item.trackCount }}首</el-col>
            <el-col :span="4" @click.native="toUserDetail()"
              >by{{ item.creator.nickname }}</el-col
            >
            <el-col :span="3">收藏：{{ item.bookCount }}</el-col>
            <el-col :span="3">收听：{{ item.playCount }}</el-col>
          </el-row>
        </div>
        <div class="result">
          <span>找到{{ searchAnchorResult.count }}个节目</span>
          <el-row>
            <el-col
              class="anchor"
              v-for="(item, index) in searchAnchorResult.data"
              :key="index"
            >
              <el-image
                :src="item.picUrl"
                @click.native="toRadioListDetail(item.id)"
              ></el-image>
              <el-link @click.native="toRadioListDetail(item.id)">{{
                item.name
              }}</el-link>
              <el-link @click.native="toRadioerDetail()">{{
                item.dj.nickname
              }}</el-link>
            </el-col>
          </el-row>
        </div>
        <div class="result">
          <span>找到{{ searchUserResult.count }}个用户</span>
          <el-row
            class="user"
            v-for="(item, index) in searchUserResult.data"
            :key="index"
          >
            <el-col :span="2"
              ><el-image
                :src="item.avatarUrl"
                @click.native="toUserDetail()"
              ></el-image
            ></el-col>
            <el-col :span="10" @click.native="toUserDetail()">{{
              item.nickname
            }}</el-col>
            <el-col :span="6">歌单：{{ item.playlistCount }}</el-col>
            <el-col :span="6">粉丝：{{ item.followeds }}</el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
    <Message msg="" />
  </div>
</template>

<script>
import axios from "@/assets/js/axios.js";
import Message from "@/components/foot/Message.vue";
export default {
  components: {
    Message,
  },
  data() {
    return {
      searchData: this.$route.params.key,
      searchSingleResult: { count: "", data: "" },
      searchSingerResult: { count: "", data: "" },
      searchAlbumResult: { count: "", data: "" },
      searchMVResult: { count: "", data: "" },
      searchLyricResult: { count: "", data: "" },
      searchSongSheetResult: { count: "", data: "" },
      searchAnchorResult: { count: "", data: "" },
      searchUserResult: { count: "", data: "" },
      typeKey: 1,
    };
  },
  created() {
    this.getSearchResult();
  },
  watch: {
    typeKey(newVal, oldVal) {
      this.getSearchResult();
    },
  },
  methods: {
    getSearchResult() {
      axios({
        url: "cloudsearch",
        method: "post",
        params: {
          keywords: this.searchData,
          type: this.typeKey,
        },
      })
        .then((res) => {
          switch (this.typeKey) {
            case 1:
              this.searchSingleResult.count = res.data.result.songCount;
              this.searchSingleResult.data = res.data.result.songs;
              break;
            case 10:
              this.searchAlbumResult.count = res.data.result.albumCount;
              this.searchAlbumResult.data = res.data.result.albums;
              break;
            case 100:
              this.searchSingerResult.count = res.data.result.artistCount;
              this.searchSingerResult.data = res.data.result.artists;
              break;
            case 1000:
              this.searchSongSheetResult.count = res.data.result.playlistCount;
              this.searchSongSheetResult.data = res.data.result.playlists;
              break;
            case 1002:
              this.searchUserResult.count = res.data.result.userprofileCount;
              this.searchUserResult.data = res.data.result.userprofiles;
              break;
            case 1004:
              this.searchMVResult.count = res.data.result.mvCount;
              this.searchMVResult.data = res.data.result.mvs;
              break;
            case 1006:
              this.searchLyricResult.count = res.data.result.songCount;
              this.searchLyricResult.data = res.data.result.songs;
              break;
            case 1009:
              this.searchAnchorResult.count = res.data.result.djRadiosCount;
              this.searchAnchorResult.data = res.data.result.djRadios;
              break;
            default:
              break;
          }
        })
        .catch((err) => {});
    },
    changeKey(num1, num2) {
      this.typeKey = num1;
      let row = document.getElementsByClassName("result");
      for (let tag in row) {
        if (parseInt(tag) === num2) {
          row[tag].style.display = "block";
        } else {
          row[tag].style.display = "none";
        }
      }
    },
    reSearch() {
      this.getSearchResult();
    },
    toPlayDetail(id) {
      this.$store.commit("setCommentId", ["music", id]);
      this.$router.push("/PlayDetail/" + id);
    },
    toSingerSongList(id) {
      this.$router.push("/SingerSongList/" + id);
    },
    toAlbumDetail(id) {
      this.$router.push("/AlbumDetail/" + id);
    },
    toMVPlayDetail(id) {
      this.$router.push("/MVPlayDetail/" + id);
      this.$store.commit("setCommentId", ["mv", id]);
    },
    toSongListDetail(id) {
      this.$router.push("/SongListDetail/" + id);
    },
    toUserDetail() {},
    toRadioListDetail(id) {
      this.$router.push("/RadioListDetail/" + id);
    },
    toRadioerDetail() {},
  },
};
</script>

<style lang = "less" scoped>
@import "/src/assets/css/main/common/search/search.less";
</style>
<template>
  <el-container>
    <el-aside style="width: 250px">
      <el-menu>
        <el-menu-item-group>
          <span>推荐</span>
          <el-menu-item @click.native="toHotType()">热门歌手</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group v-for="(itema, index) in singerLang" :key="index">
          <span>{{ itema.name }}</span>
          <el-menu-item
            v-for="(itemt, index) in singerType"
            :key="index"
            @click.native="toChange([itema.area, itemt.type])"
            >{{ itema.name }}{{ itemt.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <div class="singer-content">
      <div class="re-singer" ref="reSinger">
        <el-row class="title">
          <el-col :span="24"><span>热门歌手</span></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="content">
          <el-col v-for="(item, index) in hotSinger.slice(0, 10)" :key="index">
            <el-image
              :src="item.img1v1Url"
              @click.native="toSingerSongList(item.id)"
            ></el-image>
            <el-col @click.native="toSingerSongList(item.id)">{{
              item.name
            }}</el-col>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="sim-list">
          <el-col
            v-for="(item, index) in hotSinger.slice(10)"
            :key="index"
            @click.native="toSingerSongList(item.id)"
          >
            <span>{{ item.name }}</span>
          </el-col>
        </el-row>
      </div>
      <div class="type-singer" ref="typeSinger">
        <el-row class="title">
          <el-col :span="24"><span>按字母排序</span></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="type">
          <el-col
            v-for="(item, index) in sort"
            :key="index"
            @click.native="toInSort(item)"
            >
            <span>{{ item }}</span>
            </el-col
          >
        </el-row>
        <el-row class="content">
          <el-col
            v-for="(item, index) in singerTypeList.slice(0, 10)"
            :key="index"
          >
            <el-image
              :src="item.img1v1Url"
              @click.native="toSingerSongList(item.id)"
            ></el-image>
            <el-col @click.native="toSingerSongList(item.id)">{{
              item.name
            }}</el-col>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="sim-list">
          <el-col
            v-for="(item, index) in singerTypeList.slice(10)"
            :key="index"
            @click.native="toSingerSongList(item.id)"
          >
            <span>{{ item.name }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-container>
</template>

<script>
import axios from "@/assets/js/axios.js";
export default {
  data() {
    return {
      singerLang: [
        { area: 7, name: "华语" },
        { area: 96, name: "欧美" },
        { area: 8, name: "日本" },
        { area: 16, name: "韩国" },
        { area: 0, name: "其他" },
      ],
      singerType: [
        { type: 1, name: "男歌手" },
        { type: 2, name: "女歌手" },
        { type: 3, name: "组合/乐队" },
      ],
      sendType: "",
      sendArea: "",
      hotSinger: [],
      singerTypeList: [],
      sort: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      inita: "",
    };
  },
  created() {
    this.getHotSinger();
    this.getSingerTypeList();
  },
  watch: {
    inita(newVal, oldVal) {
      this.getSingerTypeList();
    },
    sendType(newVal, oldVal) {
      this.getSingerTypeList();
    },
    sendArea(newVal, oldVal) {
      this.getSingerTypeList();
    },
  },
  methods: {
    getSingerTypeList() {
      axios({
        url: "artist/list",
        method: "post",
        params: {
          limit: 100,
          area: this.sendArea,
          type: this.sendType,
          initial: this.inita,
        },
      })
        .then((res) => {
          this.singerTypeList = res.data.artists;
        })
        .catch((err) => {});
    },
    getHotSinger() {
      axios({
        url: "top/artists",
        method: "post",
        params: {
          limit: 100,
        },
      })
        .then((res) => {
          this.hotSinger = res.data.artists;
        })
        .catch((err) => {});
    },
    toSingerSongList(id) {
      this.$router.push("/SingerSongList/" + id);
    },
    toInSort(item) {
      this.inita = item.toLowerCase();
    },
    toChange(type) {
      this.$refs.typeSinger.style.display = "block";
      this.$refs.reSinger.style.display = "none";
      this.sendArea = type[0];
      this.sendType = type[1];
    },
    toHotType() {
      this.$refs.typeSinger.style.display = "none";
      this.$refs.reSinger.style.display = "block";
    },
  },
};
</script>
 
<style lang="less" scoped>
@import "/src/assets/css/main/findMusic/singer/singer-type-detail.less";
</style>
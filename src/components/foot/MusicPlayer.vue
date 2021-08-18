<!--  -->
<template>
  <el-container ref="playBar">
    <el-row>
      <el-col class="btn-li">
        <el-image
          src="imgs/prev.png"
          class="chose"
          @click="preMusic"
        ></el-image>
        <el-image
          v-if="isPlay"
          src="imgs/pauseMusic.png"
          class="play"
          @click="playMusic"
        ></el-image>
        <el-image
          v-else
          src="imgs/playMusic.png"
          class="play"
          @click="playMusic"
        ></el-image>
        <el-image
          src="imgs/next.png"
          class="chose"
          @click="nextMusic"
        ></el-image>
      </el-col>
      <el-col class="play-img">
        <el-image src="imgs/pauseMusic.png" class="play"></el-image>
      </el-col>
      <el-col class="play-sli">
        <el-slider
          v-model="musicDuration"
          :max="totalDuration"
          @change="musicDurationChange"
          :show-tooltip="false"
        >
        </el-slider>
        <span
          >{{ musicDuration | timeFormat }}/{{
            totalDuration | timeFormat
          }}</span
        >
      </el-col>
      <el-col class="volume-sli">
        <el-image
          v-if="musicVolume !== 0"
          src="imgs/volume.png"
          @click="noVolume"
        ></el-image>
        <el-image v-else src="imgs/shutUp.png" @click="noVolume"></el-image>
        <el-slider
          v-model="musicVolume"
          :show-tooltip="false"
          @change="musicVolumeChange"
        >
        </el-slider>
        <el-image
          src="imgs/songList.png"
          style="width: 65px"
          @click="openList"
        ></el-image>
      </el-col>
      <el-col
        class="lock"
        ref="risePlayer"
        @click.native="lockPlayer()"
        @mouseover.native="openBar()"
      >
        <el-image v-if="isLock" src="imgs/playerLock.png"></el-image>
        <el-image v-else src="imgs/playerNoLock.png"></el-image>
      </el-col>
    </el-row>

    <audio :src="musicUrl" autoplay ref="audio"></audio>
    <div class="song-list" ref="songList">
      <span class="title">
        <el-col :span="10">歌曲列表</el-col>
        <el-col :span="14">{{ songList.length }}首歌</el-col>
      </span>
      <el-table :data="songList" style="width: 100%" @row-dblclick="toPlay">
        <el-table-column type="index" width="80px"> </el-table-column>
        <el-table-column prop="name" label="标题" width="100px">
        </el-table-column>
        <el-table-column prop="dt" label="时长" width="80px"> </el-table-column>
        <el-table-column prop="ar.0.name" label="歌手" width="100px">
        </el-table-column>
      </el-table>
    </div>
  </el-container>
</template>

<script>
import axios from "@/assets/js/axios.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      musicUrl: [],
      isPlay: false,
      musicDuration: 0,
      totalDuration: 0,
      musicVolume: 20,
      isLock: false,
    };
  },

  computed: {
    ...mapGetters(["songList", "curId"]),
  },
  watch: {
    curId(newVal, oldVal) {
      this.changePlay(newVal);
      this.setAudioTagsInfo();
    },
  },
  created() {},
  methods: {
    setAudioTagsInfo() {
      let audio = this.$refs.audio;
      audio.addEventListener("timeupdate", () => {
        this.totalDuration = audio.duration;
        this.musicDuration = audio.currentTime;
        if (audio.currentTime >= audio.duration) {
          this.nextMusic();
        }
      });
      this.isPlay = true;
    },
    playMusic() {
      let audio = this.$refs.audio;
      if (this.musicUrl !== "") {
        if (!audio.paused) {
          audio.pause();
        } else {
          audio.play();
        }
        this.isPlay = !this.isPlay;
      }
    },
    musicDurationChange() {
      if (this.totalDuration === 0) return;
      let audio = this.$refs.audio;
      audio.currentTime = this.musicDuration;
    },
    musicVolumeChange() {
      this.volumeChange(this.musicVolume / 100);
    },
    volumeChange(sum) {
      let audio = this.$refs.audio;
      audio.volume = sum;
    },
    noVolume() {
      if (this.musicVolume !== 0) {
        this.volumeChange(0);
        this.musicVolume = 0;
      } else {
        this.volumeChange(0.2);
        this.musicVolume = 20;
      }
    },
    lockPlayer() {
      if (this.isLock === false) {
        this.isLock = true;
      } else {
        this.isLock = false;
      }
    },
    openBar() {
      this.$refs.playBar.$el.style.bottom = "0";
    },
    closeBar() {
      this.$refs.playBar.$el.style.bottom = "-40px";
    },
    changePlay(curId) {
      axios({
        url: "song/url",
        method: "post",
        params: {
          id: curId,
        },
      })
        .then((res) => {
          this.musicUrl = res.data.data[0].url;
        })
        .catch((err) => {});
    },
    toPlay(row) {
      this.$store.commit("setCurId", row.id);
    },
    nextMusic() {
      var sindex = null;
      for (let snum in this.songList) {
        if (this.curId === this.songList[snum].id) {
          this.sindex = parseInt(snum) + 1;
          break;
        }
      }
      this.curId = this.songList[this.sindex].id;
    },
    preMusic() {
      var sindex = null;
      for (let snum in this.songList) {
        if (this.curId === this.songList[snum].id) {
          this.sindex = parseInt(snum) - 1;
          break;
        }
      }
      this.curId = this.songList[this.sindex].id;
    },
    openList() {
      let songList = this.$refs.songList;
      if (songList.style.display === "block") {
        songList.style.display = "none";
      } else {
        songList.style.display = "block";
      }
    },
  },
};
</script>

<style lang = "less" scoped>
@import "/src/assets/css/foot/player.less";
</style>

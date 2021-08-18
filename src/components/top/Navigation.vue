<!--  -->
<template>
  <el-container>
    <el-header>
      <el-menu
        default-active="/recommend"
        :router="true"
        mode="horizontal"
      >
        <el-menu-item index="/recommend" class="logo"></el-menu-item>
        <el-menu-item index="/recommend">发现音乐</el-menu-item>
        <el-menu-item index="/MyMusic">我的音乐</el-menu-item>
        <el-menu-item index="/HotTopic">热门话题</el-menu-item>
      </el-menu>
      <el-input
        placeholder="搜索单曲,歌手,视频,歌单"
        v-model="searchData"
        size="mini"
        suffix-icon="el-icon-search"
        @keyup.native.enter="toSearch(searchData)"
      >
        <el-button slot="suffix" class="searchBtn" size="mini"></el-button>
      </el-input>
      <div class="loginBtn">
        <div v-if="cookie" class="sign-in">
          <el-image :src="avatarUrl" @mouseover="openOut"></el-image>
          <el-button
            class="sign-out"
            ref="signOutBtn"
            @mouseleave="closeOut"
            @click="signOut()"
            >退出</el-button
          >
        </div>
        <el-button v-else @click="openLoginList">登录</el-button>
      </div>
    </el-header>
    <el-main>
      <el-form ref="loginList">
        <el-form-item style="background-color: #2d2d2d">
          用户登录
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入手机号码"
            type="user"
            v-model="userName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="passWord"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <span>自动登录</span><span>忘记密码</span>
        </el-form-item>
        <el-form-item>
          <el-button @click="toLogin()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import axios from "@/assets/js/axios.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchData: "",
      userName: "liuyangzhen2021@163.com",
      passWord: "shideican555",
    };
  },
  created() {},
  computed: {
    ...mapGetters(["cookie", "userMsg", "avatarUrl"]),
  },
  watch: {
    userMsg(newVal, oldVal) {
      this.avatarUrl = newVal.profile.avatarUrl;
    },
  }, 
  methods: {
    openLoginList() {
      let loginList = this.$refs.loginList.$el;
      if (loginList.style.display === "block") {
        loginList.style.display = "none";
      } else {
        loginList.style.display = "block";
      }
    },
    openOut() {
      let signOutBtn = this.$refs.signOutBtn.$el;
      signOutBtn.style.display = "block";
    },
    closeOut() {
      let signOutBtn = this.$refs.signOutBtn.$el;
      signOutBtn.style.display = "none";
    },
    toLogin() {
      axios({
        url: "login",
        method: "post",
        params: {
          email: this.userName,
          password: this.passWord,
          _t: Date.parse(new Date()),
        },
      })
        .then((res) => {
          this.$store.commit("setCookie", res.data.cookie);
          this.$store.commit("setUserMsg", res.data);
          this.$store.commit("setAvatarUrl", res.data.profile.avatarUrl);
          let loginList = this.$refs.loginList.$el;
          loginList.style.display = "none";
          if (res.data["code"] == 200) {
            sessionStorage.clear();
            sessionStorage.setItem(
              "userid",
              JSON.stringify(res.data.account.id)
            );
            sessionStorage["cookie"] = JSON.stringify(res.data.cookie);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    signOut() {
      axios({
        url: "logout",
        method: "post",
      })
        .then((res) => {
          this.$store.commit("setUserMsg", null);
          this.$store.commit("setToken", null);
          sessionStorage.setItem("userid", null);
          sessionStorage.setItem("token", null);
          this.$store.commit("setCookie", null);
        })
        .catch((err) => {});
    },
    toSearch(key) {
      this.$router.push("/Search/" + key);
    },
  },
};
</script>

<style lang="less" scoped>
@import "/src/assets/css/top/navigation.less";
</style>

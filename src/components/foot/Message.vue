<template>
  <el-container>
      <el-footer>
        <el-row>
          <el-col>
            <el-menu>
              <el-menu-item index="#">服务条款<span>|</span></el-menu-item>
              <el-menu-item index="#">隐私政策<span>|</span></el-menu-item>
              <el-menu-item index="#">儿童隐私政策<span>|</span></el-menu-item>
              <el-menu-item index="#">版权投诉指引<span>|</span></el-menu-item>
              <el-menu-item index="#">意见反馈<span>|</span></el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
            <p>网易公司版权所有©1997-2021</p>
            <p>杭州乐读科技有限公司运营：浙网文[2021] 1186-054号</p>
            <span>{{$store.state.musicId}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <p>违法和不良信息举报电话：0571-89853516 举报邮箱：ncm5990@163.com</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <p>粤B2-20090191-18  工业和信息化部备案管理系统网站</p>
            <p>浙公网安备 33010902002564号</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-image src="/imgs/message.png"></el-image>
          </el-col>
        </el-row>
      </el-footer>
  </el-container>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import "/src/assets/css/foot/message.less";
</style>
<template>
  <div class="management">
    <aside class="bg-purple-dark aside">
      <el-menu default-active="1-1" class="el-menu-vertical-demo" :collapse="isCollapse" :unique-opened="uniqueOpened">
        <el-submenu index="1">
          <template slot="title">
            <span slot="title">员工管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">
              <router-link to="/admin/register" class="link"> 员工注册</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link to="/admin/register" class="link"> 账号注销</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span slot="title">公司管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">
              <router-link to="/admin/meetingRoomManage" class="link"> 会议室管理</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link to="/admin/register" class="link"> 界面箴言</router-link>
            </el-menu-item>
            <el-menu-item index="2-3">
              <router-link to="/admin/register" class="link"> 全局通知</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </aside>
    <div class="bg-purple content">
      <section class="m-t-1 view">
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>

<script lang="babel">
  export default {
    name: 'management',
    data () {
      return {
        isCollapse: false,
        uniqueOpened: true,
      }
    },
    created() {
    },
    computed : {
      getTitle() {
        return this.$store.state.global_title;
      }
    },
    methods : {
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .management{
    width:100%;
    display: flex;
  }

  .link{
    color: #666 !important;
  }

  .aside{
    padding:.3rem .3rem;
    width:15rem;
    text-align: left;
  }

  .content{
    display: flex;
    flex-direction: column;
    flex: 1;

    >h3{
       width:50%;
       height:3rem;
       line-height:3rem;
       text-align: left;
       padding-left:1.5rem;
       font-size:1.08rem;
       color: #21486f;
       border-radius:0 1.5rem 1.5rem 0rem;;
    }
  }

  .view{
    flex:1;
  }
</style>

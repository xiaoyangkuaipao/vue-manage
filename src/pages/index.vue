<template>
  <div id="index">
    <header class="bg-black index-header">
      <section class="log">
        <img src="../../static/image/logo.gif">
        <span>氧气企业管理系统</span>
      </section>
      <p class="user-info" v-if="showUserInfo">
        <span>工号：{{user.jobId}}</span>
        <span class="p-l-1">姓名：{{user.name}}</span>
      </p>
    </header>
    <div class="index-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="babel">
  export default {
    name: 'index',
    data () {
      return {
        showUserInfo: false,
        user: '',
      }
    },
    created() {
      if(this.$route.path !== '/login') {                             // 防止刷新造成数据丢失
        this.showUserInfo = true;
        this.setUser();
        this.user = this.$store.state.user;
      }
    },
    methods: {
      setUser() {
        if(!this.$store.state.user) {
          this.$store.commit('SET_USER');
        }
      }
    },
    watch: {
      $route(to, from) {
        if(to.path === '/login') {
          this.showUserInfo = false;
        }
        if(from.path === '/login') {
          this.showUserInfo = true;
          this.user = this.$store.state.user;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/less" lang="less">
  #index {
    display: flex;
    flex-direction: column;
    min-height:100vh;
  }

  .user-info{
    position: absolute;
    right:1rem;
    bottom:.5rem;
    font-size:.8rem;
    color:white;
  }

  .index-header {
    position: relative;
    width:100%;
    height:8rem;

    .log{
      display: flex;
      width:8rem;
      margin:1.2rem 0 0 1rem;
      text-align:center;
      flex-direction: column;
      position: absolute;

      img{
        margin-left:1rem;
        width:5rem;
        height:5rem;
      }

      span{
        color:#CCC;
        font-size:.8rem;
      }
    }
  }

  .index-body {
    flex:1;
    display: flex;
  }

</style>

<template>
  <div class="management">
    <aside class="bg-purple-dark aside">
      <section class="time">{{time}}</section>
      <section class="note">
        <article>
          <h5>{{dayth}}</h5>
          <p>黄金时代是在我们的前面，而不在我们的后面。</p>
        </article>
      </section>
      <div class="m-t-1">
        <el-menu default-active="1-1" class="el-menu-vertical-demo" :collapse="isCollapse" :unique-opened="uniqueOpened">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-my-user1"></i>
              <span slot="title">个人</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/personal/message" class="link"><span class="el-icon-my-xiaoximailmian"></span> 消息</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/personal/calendar" class="link"><span class="el-icon-my-richengbiao"></span> 日程表</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                <router-link to="/personal/note" class="link"><span class="el-icon-my-jinlingyingcaiwangtubiao42-copy"></span> 记事本</router-link>
              </el-menu-item>
              <el-menu-item index="1-4">
                <router-link to="/personal/report" class="link"><span class="el-icon-my-baogao"></span> 工作报告</router-link>
              </el-menu-item>
              <el-menu-item index="1-5">
                <router-link to="/personal/leaveApplication" class="link"><span class="el-icon-my-qingjia"></span> 请假事宜</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-my-tuandui1"></i>
              <span slot="title">团队</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <router-link to="/team/teamOverview" class="link"><span class="el-icon-my-zonglan"></span> 团队总览</router-link>
              </el-menu-item>
              <el-menu-item index="2-2">
                <router-link to="/team/transselect" class="link"><span class="el-icon-my-fenzu"></span> 团队分组</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-my-gongsi"></i>
              <span slot="title">公司</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <router-link to="/company/morningReport" class="link"><span class="el-icon-my-meirichenbao"></span> 公司晨报</router-link>
              </el-menu-item>
              <el-menu-item index="3-2">
                <router-link to="/company/bookingRoom" class="link"><span class="el-icon-my-huiyishiyuding"></span> 会议室预定</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </aside>
    <div class="bg-purple content">
      <h3 class="bg-purple-dark">{{getTitle}}</h3>
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
        time: '',
        isCollapse: false,
        uniqueOpened: true,
      }
    },
    created() {
      this.showTime();
      setInterval(this.showTime, 1000);
    },
    computed : {
      dayth () {
        const dayth = (new Date).getDay();
        let day = '';
        switch (dayth) {
          case 0 : day = '星期日'; break;
          case 1 : day = '星期一'; break;
          case 2 : day = '星期二'; break;
          case 3 : day = '星期三'; break;
          case 4 : day = '星期四'; break;
          case 5 : day = '星期五'; break;
          case 6 : day = '星期六'; break;
        }
        return day;
      },
      getTitle() {
        return this.$store.state.global_title;
      }
    },
    methods : {
      showTime() {
        const time = new Date();
        const year = time.getFullYear();
        const month = (time.getMonth() + 1) >=10 ? time.getMonth() + 1 : '0'+(time.getMonth() + 1);
        const day = time.getDate() >=10 ? time.getDate() : '0'+time.getDate();
        const h = time.getHours() >=10 ? time.getHours() : '0'+time.getHours();
        const m = time.getMinutes() >=10 ? time.getMinutes() : '0'+time.getMinutes();
        const s = time.getSeconds() >=10 ? time.getSeconds() : '0'+time.getSeconds();

        this.time = year + '-' + month + '-' + day + '  ' + h + ':' + m + ':' + s;
      }
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

  .time {
    height:2rem;
    line-height: 2rem;
    font-size:.95rem;
    border-radius:1rem;
    text-align: center;
    background-color: #E5E9F2;
  }

  .note{
    padding:0 1rem;

    article {
      background-color: #E5E9F2;
      border-radius:0 0 1rem 1rem;
    }

    h5{
      margin:0;
      padding:0;
      text-align: center;
    }

    p{
      margin:.5rem;
      line-height:1.5rem;
      font-size:.85rem;
      color:#475669;
    }
  }

  .aside{
    padding:1rem .3rem;
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

import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import login from '@/pages/login'
import register from '@/pages/adminPage/register'
import meetingRoomManage from '@/pages/adminPage/meetingRoomManage'
import teamOverview from '@/pages/userPage/teamOverview'
import leaveApplication from '@/pages/userPage/leaveApplication'
import morningReport from '@/pages/userPage/morningReport'
import bookingRoom from '@/pages/userPage/bookingRoom'
import calendar from '@/components/calendar'
import management from '@/components/user'
import admin from '@/components/admin'
import note from '@/components/note'
import report from '@/components/report'
import message from '@/components/message'
import transselect from '@/components/transselect'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: index,
      children: [{
        path: '/login',
        name: '/login',
        component: login,
      }, {
        path: '/admin',
        name: 'admin管理界面',
        component: admin,
        children: [{
          path: '/admin/register',
          name: '员工注册',
          component: register,
        }, {
          path: '/admin/meetingRoomManage',
          name: '员工注册',
          component: meetingRoomManage,
        }],
      }, {
        path: '/management',
        name: '管理界面',
        component: management,
        children:[
          {
            path: '/personal/calendar',
            name: '个人 >> 日程表',
            component: calendar,
          }, {
            path: '/personal/note',
            name: '个人 >> 记事本',
            component: note,
          }, {
            path: '/personal/report',
            name: '个人 >> 工作报告',
            component: report,
          }, {
            path: '/personal/message',
            name: '个人 >> 消息',
            component: message,
          }, {
            path: '/personal/leaveApplication',
            name: '个人 >> 请假事宜',
            component: leaveApplication,
          }, {
            path: '/team/transselect',
            name: '团队 >> 团队分组',
            component: transselect,
          }, {
            path: '/team/teamOverview',
            name: '团队 >> 团队总览',
            component: teamOverview,
          }, {
            path: '/company/morningReport',
            name: '公司 >> 公司晨报',
            component: morningReport,
          }, {
            path: '/company/bookingRoom',
            name: '公司 >> 会议室预定',
            component: bookingRoom,
          }
        ],
      }],
    }
  ]
});

router.beforeEach((to, from, next) => {
  const self = router.app;
  if (to.matched.length ===0) {    //如果未匹配到路由
    router.replace('/login');
  } else {
    if(self.$store) {             //如果匹配到正确跳转
      self.$store.commit('SET_GLOBAL_TITLE',{global_title: to.name});
    }
    next();
  }
})

export default router

/**
 * Created by oxygen on 2017/10/19.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';

Vue.use(Vuex)

const state = {
  global_title: '',        // 显示界面标题
  user: '',                // 用户相关信息
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})

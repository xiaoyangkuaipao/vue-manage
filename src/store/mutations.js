/**
 * Created by oxygen on 2017/10/19.
 * mutation是同步的, 是指立即改变store中state的值，而action 是异步的
 */
import {
  SET_GLOBAL_TITLE,
  SET_USER,
} from './mutation-types'

export default {
  [SET_GLOBAL_TITLE](state, {
    global_title,
  }) {
    state.global_title = global_title;
  },
  [SET_USER](state) {
    state.user = JSON.parse(sessionStorage.getItem('user'));
  },
}

/**
 * @Author: liang.zhu
 * @Date: 2018/9/13 下午2:33
 * 主页相关store信息
 */
import Util from '../../util/util';

const sessionKey = {
  breadCrumb: 'BREADCRUMB',
  breadCrumbDefaultValue: [{
    url: '/deployIndex',
    query: 0,
    name: '平台部署',
    meta: { level: 0 },
  }],
};

const state = {
  breadCrumb: Util.getDataFormSessionStorage(sessionKey.breadCrumb, true, sessionKey.breadCrumbDefaultValue),
};

const getters = {
  getBreadCrumb: state => state.breadCrumb,
};

const mutations = {
  // 点击新增路由
  addBreadCrumb(state, obj) {
    const level = obj.meta.level;
    const breadCrumb = state.breadCrumb;
    // 删除高级别的目录
    for (let i = 0, len = breadCrumb.length; i < len; i++) {
      console.log(breadCrumb[i])
      if (breadCrumb[i].meta.level >= level) {
        breadCrumb.splice(i, 1);
        i--;
        len--;
      }
    }
    breadCrumb.push(obj);
    Util.setSessionStorageData(sessionKey.breadCrumb, JSON.stringify(state.breadCrumb));
  },
};

const actions = {
  setAddBreadCrumb({ commit }, obj) {
    commit('addBreadCrumb', obj);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};


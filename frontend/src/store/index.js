import { createStore } from 'vuex'

export default createStore({
  state: {
    // name: "Teachers and Students",
    // isAuth: false,
    // isTeacher: false,
    user: {
      name: "Teachers and Students",
      isAuth: false,
      isTeacher: false,
      courses: [],
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
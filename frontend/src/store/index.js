import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: {
      name: "Teachers and Students",
      isAuth: false,
      isTeacher: false,
      courses: [],
    }
  },
  mutations: {
    addCourse(state, course) {
      state.user.courses.push(course);
    },

    dropCourse(state, course) {
      state.user.courses.splice(state.user.courses.indexOf(course), 1);
    }
  },

  actions: {
    async pushCourse({commit}, courseInfo) {

        let course = (await axios.patch('http://localhost:3000/api/user/course/add', {
          course: courseInfo.course,
          token: courseInfo.token
        })).data;

        commit('addCourse', course.courseName)
        console.log(course.courseName + ' was added to user courses')

    },

    async popCourse({commit}, courseInfo) {
        let course = (await axios.post('http://localhost:3000/api/user/course/drop', {
          course: courseInfo.course,
          token: courseInfo.token
        })).data;

      commit('dropCourse', course.courseName)
      console.log(course.courseName + ' was removed from user courses')
    },
  },
  modules: {}
});
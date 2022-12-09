import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: {
      name: "Teachers and Students",
      isAuth: false,
      isTeacher: false,
      courses: [],
    },
    courses: []
  },
  mutations: {
    addCourse(state, course) {
      state.user.courses.push(course);
    },

    dropCourse(state, course) {
      state.user.courses.splice(state.user.courses.indexOf(course), 1);
    },

    setUserState(state, user) {
      state.user.name = user.name,
      state.user.isAuth = user.isAuth,
      state.user.isTeacher = user.isTeacher
      //state.user.courses = user.courses
      for (let [course] of user.courses) {
        //console.log(course);
        state.user.courses.push(course);
      }
    },

    setAllCourses(state, courses) {
      // state.courses = courses.data
      courses.forEach(function(row) {
        state.courses.push(row)
      })
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

    async updateCourses({commit}) { 
      let coursedata = (await axios.get('http://localhost:3000/api/courses')).data

      commit('setAllCourses', coursedata)
    },

    async auth({commit}, credentials) {
      axios.get('http://localhost:3000/api/user', { headers: { token: credentials}})
      .then(res => {
        console.log(res);
        let user = {
          name: res.data.user.name,
          isAuth: true,
          isTeacher: res.data.user.isTeacher,
          courses: res.data.user.courses
        }
        commit('setUserState', user)
        console.log(`${user.name} has been authenticated and information loaded.`)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.error)
        }
      })
    }
  },
  modules: {}
});
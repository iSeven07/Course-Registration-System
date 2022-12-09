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
        // state.user.name = res.data.user.name;
        // state.user.isAuth = true;
        // state.user.isTeacher = res.data.user.isTeacher;
        //this.$store.state.user.courses = res.data.user.courses;
        // for (let [course] of res.data.user.courses) {
        //   console.log(course);
          // state.user.courses.push(course);
        // }
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
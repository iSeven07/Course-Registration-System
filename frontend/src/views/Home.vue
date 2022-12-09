<template>
  <div class="p-5">
    <!-- <div class="h3">
        Welcome Teachers and Students!
      </div>
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id tempora at suscipit quas rerum rem voluptatum a. </p>
        <a href="/courses" class="btn btn-primary btn-lg active m-3" role="button" aria-pressed="true">Courses</a>
        <a href="/courses/add" class="btn btn-secondary btn-lg active" role="button" aria-pressed="true">Add Course</a>
      </div> -->
  
    <div class="jumbotron">
      <!-- Having to use span and innerHTML because {{ name }} is not working... -->
      <h1 class="display-4">Hello, {{ $store.state.user.name }}</h1>
      <h1 class="display-4"></h1>
      <p class="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id tempora at suscipit quas rerum rem voluptatum a.</p>
      <hr class="my-4">
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod illum ab placeat eum, rerum expedita impedit voluptates quaerat, voluptate culpa, excepturi perspiciatis quia numquam repellendus dolorum deserunt eaque eligendi. Deleniti!</p>
      <p class="lead">
        <!-- <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a> -->
        <router-link class="btn btn-primary btn-lg text-light" to="/courses">Courses</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {

  date() {
    return {

    }
  },

  async mounted() {
    
    // Check Logged In Status
    axios.get('http://localhost:3000/api/user', { headers: { token: localStorage.getItem('token')}})
    .then(res => {
      console.log(res);
      this.$store.state.user.name = res.data.user.name;
      this.$store.state.user.isAuth = true;
      this.$store.state.user.isTeacher = res.data.user.isTeacher;
      //this.$store.state.user.courses = res.data.user.courses;
      for (let [course] of res.data.user.courses) {
        console.log(course);
        this.$store.state.user.courses.push(course);
      }
      console.log(`${this.$store.state.user.name} has been authenticated on Home`)
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data.error)
      }
    })

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>

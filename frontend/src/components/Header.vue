<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark pe-3">
    <!-- <a class="navbar-brand ps-5" href="/">Faux School</a> -->
    <router-link class="navbar-brand ps-5" to="/">Faux School</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <ul class="navbar-nav ms-auto pe-1 text-end">
          <li class="nav-item">
            <!-- <a href="/" class="nav-link">Home</a> -->
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <!-- <a href="/courses" class="nav-link">Courses</a> -->
            <router-link class="nav-link" to="/courses">Courses</router-link>
          </li>
          <!-- -->
          <li v-if="!this.$store.state.user.isAuth" class="nav-item">
            <!-- <a href="/login" class="nav-link">Login</a> -->
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-else class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color:yellowgreen">
            {{ $store.state.user.name }}
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><router-link class="dropdown-item" to="/user/courses">My Courses</router-link></li>
            <li><a href="#" @click="logout()" class="dropdown-item">Logout</a></li>
          </ul>
        </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {

    };
  },

  computed: {

    isAuthenticated() {
      if (localStorage.getItem('token')) {
        return true
      }
      else {
        return false
      }
    }

    },

    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$store.state.user.name = 'Teachers and Students';
        this.$store.state.user.isAuth = false;
        this.$store.state.user.isTeacher = false;
        this.$store.state.user.courses = [];

        let currentPage = this.$route.name;
        //this.$router.go(this.$router.currentRoute)
        this.$router.push({ path: '/' });
        //this.$router.go()
      }
    },

    async mounted() {
    
    // Check Logged In Status
    this.$store.dispatch('auth', localStorage.getItem('token'))

  }
}

</script>
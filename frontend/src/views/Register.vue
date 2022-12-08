<template>
	<div class="p-5">
		<div class="h1 text-center">Create Account</div>
		<div class="pt-2" style="margin-left: auto; margin-right: auto; max-width:300px">

<div>
  Name: <input class="form-control" type="text" v-model="name" /><br />
  Username: <input class="form-control" type="text" v-model="userName" /><br />
  Password: <input class="form-control" type="password" v-model="password" /><br />
  <div class="form-check form-switch mb-3">
  <input class="form-check-input" type="checkbox" id="isTeacher" v-model="isTeacher" />
  <label for="checkbox">Teacher Account</label>
  </div>
  <button class="btn btn-primary" @click="signup()">Register</button> {{ error }}
</div>
</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',

  data() {
    return {
      name: '',
      userName: '',
      password: '',
      isTeacher: false,
      error: '',
    }
  },

  methods: {
    signup() {
      let newUser = {
        name: this.name,
        userName: this.userName,
        password: this.password,
        isTeacher: this.isTeacher
      }

      axios.post('http://localhost:3000/api/signup', newUser)
      .then(res => {
        console.log(res)
      }, err => {
        console.log(err.response)
        this.error = err.response.data.error;
      })

      this.$router.push({ name: 'login'});
    }
  }
}
  
</script>
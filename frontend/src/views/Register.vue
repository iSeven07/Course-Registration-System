<template>
<div>
  Name: <input type="text" v-model="name" /><br />
  Username: <input type="text" v-model="userName" /><br />
  Password: <input type="password" v-model="password" /><br />
  <button @click="signup()">Register</button> {{ error }}
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
      error: '',
    }
  },

  methods: {
    signup() {
      let newUser = {
        name: this.name,
        userName: this.userName,
        password: this.password,
      }

      axios.post('http://localhost:3000/api/signup', newUser)
      .then(res => {
        console.log(res)
      }, err => {
        console.log(err.response)
        this.error = err.response.data.error;
      })
    }
  }
}
  
</script>
<template>
	<div class="pt-5">
		<div class="h1 text-center">Login</div>
		<div class="pt-2" style="margin-left: auto; margin-right: auto; width:60%">
			<form>
				<div class="form-group">
					<label for="nameInput">User:</label>
					<input type="text" id="nameInput" class="form-control" ref="username" aria-describedby="emailHelp" />
				</div>

				<div class="form-group my-2">
					<label for="titleInput">Password:</label>
					<input id="titleInput" type="text" class="form-control" ref="password" />
				</div>

				<button class="btn btn-primary" @click.prevent="login()">Confirm</button>
			</form>
			<div id="errorMsg"></div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  methods: {
    async login() {
      this.userName = this.$refs.username.value;
			this.password = this.$refs.password.value;
      console.log(this.userName + " " + this.password);
      await axios.post('http://localhost:3000/api/user/auth', {
				username: this.userName ,
        password: this.password,
			}).then(async (response) => {
				console.log(response);
        if(response.status == 200) {

          // const tokenResponse = await response.json();
          const tokenResponse = await response.data.token
          console.log(tokenResponse);
          localStorage.setItem("token", tokenResponse);

					this.$router.push({ name: 'home'});
        }
      }).catch((error => {
        console.log(`Error: ${error}`)
        document.getElementById('errorMsg').innerHTML = `<strong>ERROR 401</strong><br/>Username and/or Password is Invalid.`
      }));
    } 
  }
};
</script>
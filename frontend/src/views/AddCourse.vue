<template>
	<div class="pt-5">
		<div class="h1 text-center">Add Course</div>
		<div class="pt-2" style="margin-left: auto; margin-right: auto; width:60%">
			<form>
				<div class="form-group">
					<label for="nameInput">Course:</label>
					<input type="text" id="nameInput" class="form-control" ref="courseName" aria-describedby="emailHelp" />
					<small id="nameHelp" class="form-text text-muted">Example: ASTR-101</small>
				</div>
				<div class="form-group my-2">
					<label for="titleInput">Title:</label>
					<input id="titleInput" type="text" class="form-control" ref="courseTitle" />
				</div>
				<div class="form-group my-2">
					<label for="creditsInput">Credits:</label>
					<input id="creditsInput" type="number" class="form-control" ref="courseCredits" />
				</div>
				<button class="btn btn-primary" @click.prevent="getFormValues()">Confirm</button>
			</form>
			<div id="alert" class="mt-5 alert" role="alert" :class="alertType"></div>

		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			courseName: '',
			courseTitle: '',
			courseCredits: '',
			errors: [],
			alertType: {
				active: false,
				"alert-danger": false,
				"alert-success": false
			},
		};
	},

	computed: {},

	methods: {

		getFormValues() {
			this.errors = [];
			this.courseName = this.$refs.courseName.value;
			this.courseTitle = this.$refs.courseTitle.value;
			this.courseCredits = this.$refs.courseCredits.value;

			if (this.courseName && this.courseTitle && this.courseCredits) {
				this.postCourse();
				this.alertType = {
					active: true,
					"alert-success": true,
					"alert-danger": false
				}
				// Note: Tiny Error happens in browser when using a-link to go to courses, but vue-router doesn't work with innerHTML
				// Suggestions may be to use components instead or v-if / v-show, which makes template area complex with logic
				document.getElementById('alert').innerHTML = `<p style="margin: 0; padding: 0"><strong>Success</strong>: Course was updated successfully. Go back to <a  class="alert-link" href="/courses">Courses</a>.`
			} else {
				if (!this.courseName) this.errors.push('No Course Name');
				if (!this.courseTitle) this.errors.push('No Course Title');
				if (!this.courseCredits) this.errors.push('No Course Credits');
				this.alertType = {
					active: true,
					"alert-danger": true,
					"alert-success": false
				}
				let alertText = '';
				for (let error of this.errors) {
					alertText += `<p style="margin: 0; padding:0;"><strong>Error</strong>: ${error}</p>`
				}
				document.getElementById('alert').innerHTML = alertText;
			}
		},

		async postCourse() {
			await axios.post('http://localhost:3000/api/course/add', {
				name: this.courseName,
				title: this.courseTitle,
				credits: this.courseCredits
			});

			this.$store.dispatch('pushCourse', {
				course: this.courseName,
				token: localStorage.getItem('token')
			});

		},
	},
};
</script>

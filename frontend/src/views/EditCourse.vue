<template>
	<div class="p-5">
		<div class="h1 text-center">Edit Course</div>
		<div class="h3 pt-2 text-center">{{ courseName }}</div>
		<div class="pt-2" style="margin-left: auto; margin-right: auto; width:60%">

			<form>
				<div class="form-group">
				<label for="nameInput">Course:</label>
				<input type="text"  id="nameInput" class="form-control" ref="courseName" v-model="course.name" aria-describedby="emailHelp" />
				<small id="nameHelp" class="form-text text-muted">Example: ASTR-101</small>
				</div>
				<div class="form-group my-2">
				<label for="titleInput">Title:</label>
				<input id="titleInput" type="text" class="form-control" ref="courseTitle" v-model="course.title" />
				</div>
				<div class="form-group my-2">
					<label for="creditsInput">Credits:</label>
					<input id="creditsInput" type="number" class="form-control" ref="courseCredits" v-model="course.credits"/>
				</div>
				<button class="btn btn-primary" @click.prevent="getFormValues()">Confirm Edit</button>
			</form>
			<div id="alert" class="mt-5 alert" role="alert"
			:class="alertType"
			></div>

		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			course: [],
			courseID: 'ID Set',
      courseName: '',
			newCourseName: '',
			newCourseTitle: '',
      courseTitle: '',
			courseCredits: 0,
			newCourseCredits: 0,
			errors: [],
			alertType: {
				active: false,
				"alert-danger": false,
				"alert-success": false
			}
		};
	},

	async created() {
		this.courseID = this.$route.params.courseID;
		await axios
			.post('http://localhost:3000/api/course', {
				courseID: this.courseID,
			})
			.then((resp) => {
				this.course = resp.data;
        this.courseName = resp.data.name
        this.courseTitle = resp.data.title
				this.courseCredits = resp.data.credits
			});
	},

	methods: {
		getFormValues() {
			this.errors = [];
			this.newCourseName = this.$refs.courseName.value;
			this.newCourseTitle = this.$refs.courseTitle.value;
			this.newCourseCredits = this.$refs.courseCredits.value;

			if (this.newCourseName && this.newCourseTitle && this.newCourseCredits) {
				this.postCourse();
				this.courseName = this.newCourseName;
				this.alertType = {
					active: true,
					"alert-success": true,
					"alert-danger": false
				}
				// Note: Tiny Error happens in browser when using a-link to go to courses, but vue-router doesn't work with innerHTML
				// Suggestions may be to use components instead or v-if / v-show, which makes template area complex with logic
				document.getElementById('alert').innerHTML = `<p style="margin: 0; padding: 0"><strong>Success</strong>: Course was updated successfully. Go back to <a  class="alert-link" href="/courses">Courses</a>. `
			} else {
				if (!this.newCourseName) this.errors.push('No Course Name');
				if (!this.newCourseTitle) this.errors.push('No Course Title');
				if (!this.newCourseCredits) this.errors.push('No Course Credits');
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
			await axios.patch('http://localhost:3000/api/course/edit', {
				courseID: this.courseID,
        courseName: this.newCourseName,
        courseTitle: this.newCourseTitle,
				courseCredits: this.newCourseCredits
			});
		},
	},
};
</script>

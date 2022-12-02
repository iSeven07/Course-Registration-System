<template>
	<div class="p-5 text-center">
		<div class="h3">You are editing:</div>
		<h2>{{ courseName }}</h2>
		<div class="pt-5">
			<form>
        <label for="nameInput">Name:</label>
				<input id="nameInput" type="text" ref="courseName" v-model="course.name" />
        <br />
        <label for="titleInput">Title:</label>
				<input id="titleInput" type="text" ref="courseTitle" v-model="course.title" />
				<button @click.prevent="getFormValues()">Get values</button>
			</form>

			<h2>Current Course Name: {{ courseName }}</h2>
			<h2>Current Course Title: {{ courseTitle }}</h2>
			<ul>
				<li v-for="(error, i) in errors" :key="i">{{ error }}</li>
			</ul>
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
      courseTitle: '',
			errors: [],
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
			});
	},
	methods: {
		getFormValues() {
			this.errors = [];
			this.courseName = this.$refs.courseName.value;
			this.courseTitle = this.$refs.courseTitle.value;

			if (this.courseName && this.courseTitle) {
				this.postCourse();
			} else {
				if (!this.courseName) this.errors.push('No Course Name');
				if (!this.courseTitle) this.errors.push('No Course Title');
			}
		},
		async postCourse() {
			await axios.patch('http://localhost:3000/api/course/edit', {
				courseID: this.courseID,
        courseName: this.courseName,
        courseTitle: this.courseTitle
			});
		},
	},
};
</script>

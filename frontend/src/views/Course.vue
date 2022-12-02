<template>
	<div class="p-5 text-center">
		<div class="h3">Available Courses:</div>
		<div class="pt-5">
			<h2 v-for="(course, i) in courses" :key="i">
				{{ course.name }}: {{ course.title }}
				<button @click="deleteCourse(course._id)">Delete</button>
				<button @click="viewCourse(course.name)">View</button>
				<button @click="editCourse(course._id)">Edit</button>
			</h2>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			courses: [],
			deleteKey: 0,
		};
	},

	async created() {
		this.courses = (await axios.get('http://localhost:3000/api/courses')).data;
	},

	methods: {
		async deleteCourse(id) {
			console.log(id);
			axios.post('http://localhost:3000/api/course/delete', {
				courseID: id,
			});
			window.location.reload();
		},
		viewCourse(courseName) {
			let coursePath = `/course/${courseName}`;
			this.$router.push({ path: coursePath });
		},
		editCourse(id) {
			this.$router.push({ name: 'edit-course', params: { courseID: id } });
		},
	},
};
</script>

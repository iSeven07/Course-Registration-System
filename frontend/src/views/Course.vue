<template>
	<div class="p-5 text-center">
		<div class="h3">Available Courses:</div>
		<div class="pt-5">
			<h2 v-for="(course, i) in courses" :key="i">
				{{ course.name }}: {{ course.title }}
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
		};
	},

	async created() {
		this.courses = (await axios.get('http://localhost:3000/api/courses')).data;
	},
};
</script>

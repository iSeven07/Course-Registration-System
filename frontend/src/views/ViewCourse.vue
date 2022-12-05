<template>
	<div class="p-5 text-center">
		<div class="h3">Course:</div>
		<div class="pt-5">
			<h2>{{ viewedCourse }}</h2>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			courses: [],
			viewedCourse: '',
		};
	},

	async created() {
		await axios
			.get('http://localhost:3000/api/courses')
			.then((resp) => {
				this.courses = resp.data;
			})
			.finally(() => {
				this.courses.some((course) => {
					if (this.$route.params.name.toString() == course.name.toString()) {
						return this.viewedCourse = `${course.name}: ${course.title}`;
					} else {
						this.viewedCourse = 'Course not Found';
					}
				});
			});
	},
};
</script>

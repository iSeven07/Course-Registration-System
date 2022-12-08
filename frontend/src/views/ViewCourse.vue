<template>
	<div class="p-5 text-center">
		<div class="h1">View Course</div>
		<div class="pt-5">
			<!-- <h2>{{ viewedCourse }}</h2> -->

			<!-- View Course Card -->
			<!-- <div class="border border-dark align-middle rounded" style="width: 500px; margin: auto;"> -->
				<div class="border border-dark align-middle rounded w-25" style="min-width: 300px; margin:auto;">
				<div class="h2 bg-dark text-light p-3">
					{{ course.name}}
				</div>
				<div class="h3">
					<p>{{ course.title }}</p>
				</div>
				<div class="h4">
					<p class="">Credits: <span class="badge badge-dark text-light bg-dark"> {{ course.credits }}</span></p>
				</div>
				<div class=" text-dark p-3">
					<button class="mx-2 btn btn-secondary" @click="this.$router.push('/courses')">Back to Courses</button>
				</div>
			</div>

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
			course: {
				name: '',
				title: '',
				credits: 0
			}
		};
	},

	async created() {
		await axios
			.get('http://localhost:3000/api/courses')
			.then((resp) => {
				this.courses = resp.data;

				this.courses.some((course) =>	{
					if (this.$route.params.name.toString() == course.name) {
						this.course = {"name": course.name, "title": course.title, "credits": course.credits}
					}
				})
			})
			.finally(() => {
				if (!this.course.name) {
					this.course = {"name": "Course Not Found", "credits": 0}
				}
			})
	},

	methods: {


	}
};
</script>

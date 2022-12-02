<template>
	<div class="d-flex justify-content-center p-5 text-center">
		<div class="pt-5">
			<div class="h3">Add Course</div>
			<!-- <form id="addForm">
				<div class="form-row mt-5">
					<div class="col">
						<label for="courseName">Course Name</label>
						<input id="courseName" v-model="courseName" placeholder="" />
					</div>
					<div class="col">
						<label for="courseTitle">Course Title</label>
						<input id="courseTitle" v-model="courseTitle" placeholder="" />
					</div>
				</div>
				<button type="button" id="add" class="btn btn-primary mt-5">
					Add Course
				</button>
			</form> -->

			<form>
				<input type="text" ref="courseName" />
				<input type="text" ref="courseTitle" />
				<button @click.prevent="getFormValues()">Get values</button>
			</form>

			<h2>Course Name: {{ courseName }}</h2>
			<h2>Course Title: {{ courseTitle }}</h2>
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
			courseName: '',
			courseTitle: '',
			errors: [],
		};
	},

	computed: {},

	methods: {
		getFormValues() {
			this.errors = [];
			this.courseName = this.$refs.courseName.value;
			this.courseTitle = this.$refs.courseTitle.value;

			if (this.courseName && this.courseTitle) {
				// this.postCourse();
				this.$refs.courseName.value = '';
				this.$refs.courseTitle.value = '';
				this.postCourse()
				console.log('posted course');
			}
			else {
				if(!this.courseName) this.errors.push('No Course Name');
				if(!this.courseTitle) this.errors.push('No Course Title');
			}
		},

		async postCourse() {
			await axios.post('http://localhost:3000/api/course/add', {
				name: this.courseName,title: this.courseTitle,
			});
		},
	},
};
</script>

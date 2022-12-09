<template>
	<div class="p-5 text-center">
		<div class="h1">Available Courses</div>
		<div class="pt-5">
			<!-- <h2 v-for="(course, i) in courses" :key="i">
				{{ course.name }}: {{ course.title }}
				<button @click="deleteCourse(course._id, i)">Delete</button>
				<button @click="viewCourse(course.name)">View</button>
				<button @click="editCourse(course._id)">Edit</button>
			</h2> -->

			<table class="table">
				<thead class="table-dark">
					<tr>
						<th scope="col">Course</th>
						<th scope="col">Title</th>
						<th scope="col">Credits</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(course, i) in courses" :key="i">
						<td>{{ course.name }}</td>
						<td>{{ course.title }}</td>
						<td>{{ course.credits }}</td>
						<td>
							<button class="mx-2 btn btn-primary" @click="viewCourse(course.name)">View</button>
							<button v-if="(this.$store.state.user.isAuth && !this.$store.state.user.isTeacher && this.$store.state.user.courses.indexOf(course.name) == -1)" class="mx-2 btn btn-success" @click="addCourse(course.name)">Add</button>
							<button v-if="(this.$store.state.user.isAuth && !this.$store.state.user.isTeacher && this.$store.state.user.courses.indexOf(course.name) != -1)" class="mx-2 btn btn-danger" @click="dropCourse(course.name)">Drop</button>
							<button v-if="this.$store.state.user.isTeacher" class="mx-2 btn btn-secondary" @click="editCourse(course._id)">Edit</button>
							<button v-if="this.$store.state.user.isTeacher" class="mx-2 btn btn-danger" @click="deleteCourse(course._id, i)">Delete</button>
							<!-- <button class="mx-2 btn btn-secondary" :class="student" @click="addCourse(course._id)">Edit</button>
							<button class="mx-2 btn btn-danger" :class="student" @click="dropCourse(course._id, i)">Delete</button> -->
						</td>
					</tr>
					<tr v-if="this.$store.state.user.isTeacher">
						<td colspan="4"><router-link class="btn btn-primary" to="/courses/add">Add Course</router-link></td>
					</tr>
				</tbody>
			</table>

			<div>

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
			// currentUser: {},
			// teacher: {
			// 	active: false,
			// },
			// student: {
			// 	active: false,
			// },
		};
	},

	async created() {
		this.courses = (await axios.get('http://localhost:3000/api/courses')).data;
	},

	methods: {

		// whoIsUser() {
		// 	let token = localStorage.getItem('token')

		// 	if (token) {
		// 		this.currentUser = axios.get().data

		// 		if (this.currentUser.isTeacher) {
		// 			this.teacher = true;
		// 		} else {
		// 			this.teacher = false;
		// 			this.student = true;
		// 		}
		// 	}

		// },

		// addCourse() {
			
		// },

		// dropCourse() {

		// },

		async deleteCourse(id, i) {
			console.log(id);
			if(confirm("Do you really want to delete " + this.courses[i].name + "? You won't be able to undo this operation. Press OK to confirm deletion.")){
			axios.post('http://localhost:3000/api/course/delete', {
				courseID: id,
			});
			this.courses.splice(i, 1); // this replaces window.location.reload();
		}},

		viewCourse(courseName) {
			let coursePath = `/course/${courseName}`;
			this.$router.push({ path: coursePath });
		},

		editCourse(id) {
			this.$router.push({ name: 'edit-course', params: { courseID: id } });
		},

		addCourse(name) {

			if (this.$store.state.user.courses.indexOf(name) == -1) {
				this.$store.state.user.courses.push(name);
				console.log(name + " was added to user courses.")
				console.log(this.$store.state.user.courses);
			} else {
				console.log(name + ' already added to user courses');
			}
		},

		dropCourse(name) {
			if (this.$store.state.user.courses.indexOf(name) != -1) {
				let courseIndex = this.$store.state.user.courses.indexOf(name)
				this.$store.state.user.courses.splice(courseIndex, 1);
				console.log(name + " was removed to user courses.")
				console.log(this.$store.state.user.courses);
			} else {
				console.log(name + ' does not exist in user courses.');
			}
		},		
		
	},

  // async mounted() {
    
  //   // Check Logged In Status
  //   axios.get('http://localhost:3000/api/user', { headers: { token: localStorage.getItem('token')}})
  //   .then(res => {
  //     console.log(res);
  //     //this.name = res.data.user.name;
	// 		this.teacher.active = res.data.user.isTeacher
  //     console.log(`${res.data.user.name} has been authenticated on Courses`)
  //   })

  // }

};
</script>

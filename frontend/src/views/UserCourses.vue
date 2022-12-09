<template>
	<div class="p-5 text-center">
		<div class="h1">My Courses</div>
		<div class="pt-5">

			<table class="table" style="max-width: 500px; margin:auto">
				<thead class="table-dark">
					<tr>
						<th scope="col">Course</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(course, i) in this.$store.state.user.courses" :key="i">
						<td>{{ course }}</td>
            <td><button class="mx-2 btn btn-primary" @click="viewCourse(course)">View</button></td>
						<!-- <td>{{ course.title }}</td>
						<td>{{ course.credits }}</td> -->
					</tr>
					<tr>
						<td colspan="2"><router-link class="btn btn-primary" to="/courses">Back to Courses</router-link></td>
					</tr>
				</tbody>
			</table>

			<div>

			</div>

		</div>
	</div>
</template>

<script>
export default {

  methods: {
    viewCourse(courseName) {
			let coursePath = `/course/${courseName}`;
			this.$router.push({ path: coursePath });
		},
  }

}
</script>
<template>
  <div class="p-5 text-center">
    <div class="h3">
      Available Courses:
    </div>
    <div class="pt-5">
        <h2 v-for="(course, i) in courses" :key="i">
        {{ course.name }}: {{ course.title }}
        </h2>
    </div>
  </div>
</template>

<script>

export default {

    data() {
    return {
        courses: [
        { name: 'SDEV-120', title: 'Computing Logic' },
        { name: 'SDEV-140', title: 'Introduction to Programming' },
        { name: 'SDEV-255', title: 'Web Application Development' }
      ],
    };
    
  },

  methods: {

  },
};

</script>
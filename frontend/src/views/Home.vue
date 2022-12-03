<template>
  <div class="p-5">
    <!-- <div class="h3">
        Welcome Teachers and Students!
      </div>
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id tempora at suscipit quas rerum rem voluptatum a. </p>
        <a href="/courses" class="btn btn-primary btn-lg active m-3" role="button" aria-pressed="true">Courses</a>
        <a href="/courses/add" class="btn btn-secondary btn-lg active" role="button" aria-pressed="true">Add Course</a>
      </div> -->
  
    <div class="jumbotron">
      <h1 class="display-4">Hello, Teachers and Students!</h1>
      <p class="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id tempora at suscipit quas rerum rem voluptatum a.</p>
      <hr class="my-4">
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod illum ab placeat eum, rerum expedita impedit voluptates quaerat, voluptate culpa, excepturi perspiciatis quia numquam repellendus dolorum deserunt eaque eligendi. Deleniti!</p>
      <p class="lead">
        <!-- <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a> -->
        <router-link class="btn btn-primary btn-lg text-light" to="/courses">Courses</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>

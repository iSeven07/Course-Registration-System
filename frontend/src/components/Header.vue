<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark pe-3">
    <!-- <a class="navbar-brand ps-5" href="/">Faux School</a> -->
    <router-link class="navbar-brand ps-5" to="/">Faux School</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <ul class="navbar-nav ms-auto pe-1 text-end">
          <li class="nav-item">
            <!-- <a href="/" class="nav-link">Home</a> -->
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <!-- <a href="/courses" class="nav-link">Courses</a> -->
            <router-link class="nav-link" to="/courses">Courses</router-link>
          </li>
          <li class="nav-item">
            <!-- <a href="/courses/add" class="nav-link">Add Course</a> -->
            <router-link class="nav-link" to="/courses/add">Add Course</router-link>
          </li>
          <li class="nav-item">
            <!-- <a href="/viewcourse" class="nav-link">View Course</a> -->
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
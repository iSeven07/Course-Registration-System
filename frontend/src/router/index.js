import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home.vue'
import Courses from '../views/Course.vue'
import AddCourse from '../views/AddCourse.vue'
import NotFound from '../views/404.vue'

const routes = [
   {
      path: '/',
      name: 'home',
      component: HomePage
   },
   {
    path: '/courses',
    name: 'courses',
    component: Courses
   },
   {
      path: '/courses/add',
      name: 'add-course',
      component: AddCourse
     },
   {
   path: '/:pathMatch(.*)',
   name: 'not-found',
   component: NotFound
   },
]

const router = createRouter({
   history: createWebHistory(),
   hash: false,
   routes
});

export default router
<template>
  <Header />
  <MainView />
  <Footer />
</template>

<script>
import Header from './components/partials/Header.vue'
import MainView from './components/MainView.vue'
import Footer from './components/partials/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    MainView,
    Footer,
  }
}
</script>

<style>

</style>

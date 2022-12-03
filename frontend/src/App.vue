<template>
	<div>
		<Header />
		<router-view />
		<Footer />
	</div>
</template>

<script>
import Header from './components/Header.vue';
//import MainView from './components/MainView.vue'
import Footer from './components/Footer.vue';

export default {
	name: 'App',
	components: {
		Header,
		Footer,
	},

};
</script>

<style></style>

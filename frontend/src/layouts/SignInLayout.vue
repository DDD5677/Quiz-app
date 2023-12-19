<template>
	<section class="signInLayout">
		<Navbar />
		<slot></slot>
	</section>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>

<style lang="scss" scoped>
.signInLayout {
	background-image: url(@/assets/images/signInLayout.jpg);
	background-size: contain;
	background-position: center;
	min-height: 100vh;

}
</style>
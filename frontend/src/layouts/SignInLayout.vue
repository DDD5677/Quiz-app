<template>
	<section class="signInLayout">
		<Navbar />
		<div class="bg">
			<slot></slot>
		</div>
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

	.bg {
		padding-top: 100px;
		min-height: 100vh;
		backdrop-filter: brightness(80%);
	}
}
</style>
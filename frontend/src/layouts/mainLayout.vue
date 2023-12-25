<template>
	<Navbar />
	<div class="bg">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>

<style scoped>
.bg {
	padding-top: 80px;
}
</style>
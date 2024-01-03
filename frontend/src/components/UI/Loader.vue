<template>
	<div class="loader">
		<half-circle-spinner :animation-duration="1000" :size="60" :color="navbarStore.darkTheme ? '#f2f2f2' : '#263238'" />
	</div>
</template>

<script setup lang="ts">
import { useNavbarStore } from '@/stores/navbarStore';
import { HalfCircleSpinner } from '../../../node_modules/epic-spinners'
const navbarStore = useNavbarStore()
</script>

<style lang="scss" scoped>
.loader {
	margin: 100px 0;
	display: flex;
	justify-content: center;
}
</style>
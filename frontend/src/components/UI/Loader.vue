<template>
	<div class="loader">
		<half-circle-spinner :animation-duration="1000" :size="60" color="#263238" />
	</div>
</template>

<script setup lang="ts">
import { HalfCircleSpinner } from '../../../node_modules/epic-spinners'
</script>

<style lang="scss" scoped>
.loader {
	margin: 100px 0;
	display: flex;
	justify-content: center;
}
</style>
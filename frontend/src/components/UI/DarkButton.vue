<template>
	<button class="dark-btn">
		<slot></slot>
	</button>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.dark-btn {
	padding: 0.5em 1em;
	border-radius: 0.3em;
	background-color: #263238;
	color: #FFF;
	transition: all 0.3s ease;
	cursor: pointer;

	&:hover {
		opacity: 0.95;
	}

	&:disabled {
		opacity: 0.95;
		cursor: not-allowed;
	}
}
</style>
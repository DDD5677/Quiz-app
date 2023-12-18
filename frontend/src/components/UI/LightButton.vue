<template>
	<button class="light-btn">
		<slot></slot>
	</button>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.light-btn {
	background-color: white;
	color: #263238;
	font-weight: 500;
	padding: 0.4em 1em;
	border-radius: 0.3em;
	transition: all 0.3s ease;
	cursor: pointer;
	border: 2px solid #263238;

	&:hover {
		background-color: #263238;
		color: #fff;
	}

	&:disabled {
		background-color: #263238af;
		cursor: not-allowed;
	}
}
</style>
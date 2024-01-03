<template>
	<button class="dark-btn">
		<slot></slot>
		<i v-if="isLoading" class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
	</button>
</template>

<script setup lang="ts">
const props = defineProps({
	isLoading: {
		type: Boolean,
		default: false
	}
})
</script>

<style lang="scss" scoped>
.dark-btn {
	padding: 0.5em 1em;
	border-radius: 0.3em;
	background-color: #263238;
	color: #FFF;
	transition: all 0.3s ease;
	cursor: pointer;
	border: 1px solid #263238;

	i {
		font-size: 14px;
	}

	&:hover {
		opacity: 0.95;
	}

	&:disabled {
		opacity: 0.95;
		cursor: not-allowed;
	}
}
</style>
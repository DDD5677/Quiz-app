<template>
	<button
		class="delete-btn bg-stone-100 dark:bg-slate-800 text-red-800 dark:text-red-600 border border-red-800 dark:border-red-900  hover:bg-red-800 dark:hover:bg-red-800 hover:text-stone-100 dark:hover:text-stone-100">
		<slot></slot>
	</button>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.delete-btn {
	font-weight: 500;
	padding: 0.4em 1em;
	border-radius: 0.3em;
	transition: all 0.3s ease;
	cursor: pointer;
}
</style>
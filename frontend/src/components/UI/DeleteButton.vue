<template>
	<button
		class="delete-btn bg-stone-100 hover:bg-red-800 dark:bg-slate-800 dark:hover:bg-red-800 text-red-800 hover:text-stone-100 dark:text-stone-100 border border-red-800 dark:border-slate-800 dark:hover:border-red-800   ">
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
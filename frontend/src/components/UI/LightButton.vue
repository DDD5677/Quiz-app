<template>
	<button
		class="light-btn bg-stone-100 dark:bg-slate-800 text-slate-900 dark:text-slate-300 border border-slate-900 dark:border-slate-900  hover:bg-slate-800 dark:hover:bg-slate-900 hover:text-stone-100">
		<slot></slot>
	</button>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.light-btn {
	font-weight: 500;
	padding: 0.4em 1em;
	border-radius: 0.3em;
	transition: all 0.3s ease;
	cursor: pointer;
}
</style>
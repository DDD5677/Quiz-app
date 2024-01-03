<template>
	<input
		class="main-input bg-stone-100 border-slate-900 dark:border-stone-100 dark:bg-slate-700 text-slate-900 dark:text-gray-100"
		:value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
</template>

<script setup lang="ts">
interface Props {
	modelValue: string | number | null,
}
const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
input {
	padding: 10px;
	border-radius: 5px;
	border: 1px solid;
	display: inline-block;

	&:focus {
		outline: none;
	}

	&::placeholder {
		//color: #8F95A5;
		font-family: Poppins;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
}
</style>
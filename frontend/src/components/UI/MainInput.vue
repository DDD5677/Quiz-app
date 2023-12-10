<template>
	<input class="main-input" :value="modelValue"
		@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string | number }>()
</script>

<style lang="scss" scoped>
input {
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #8F95A5;

	&::placeholder {
		color: #8F95A5;
		font-family: Poppins;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
}
</style>
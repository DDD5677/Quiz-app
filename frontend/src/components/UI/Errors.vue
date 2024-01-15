<template>
	<div class="container">
		<div class="errors bg-white dark:bg-slate-800" :style="!showErors ? 'display:none' : ''">
			<dark-button @click.prevent="toggle"><i class="fa-solid fa-xmark"></i></dark-button>
			<ul>
				<li v-for="error of errors">{{ error }}</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showErors = ref(true)
const props = defineProps<{ errors: any }>()
const toggle = () => {
	showErors.value = false
}
</script>

<style lang="scss" scoped>
.errors {
	position: relative;
	padding: 25px;
	margin-top: 20px;
	border-radius: 15px;

	.dark-btn {
		padding: 0;
		width: 25px;
		height: 23px;
		position: absolute;
		right: -5px;
		top: -5px;
	}

	ul {
		list-style: inside;
	}

	color: red;
}

@media(max-width:480px) {
	.errors {
		font-size: 14px;
		padding: 15px;
	}
}
</style>
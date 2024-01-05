<template>
	<div class="theme">
		<light-button v-if="!navbarStore.darkTheme" @click.prevent="navbarStore.assignDarkTheme(true)" class="dark_theme"><i
				class="fa-solid fa-moon"></i></light-button>
		<light-button v-else @click.prevent="navbarStore.assignDarkTheme(false)" class="light_theme"><i
				class="fa-solid fa-sun"></i></light-button>
	</div>
</template>

<script setup lang="ts">
import { useNavbarStore } from '@/stores/navbarStore';

const navbarStore = useNavbarStore()
</script>

<style lang="scss" scoped>
.theme {
	.light_theme {
		&:hover {
			background-color: rgb(2 6 23);
		}
	}

	button {
		border-radius: 50%;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
	}
}
</style>
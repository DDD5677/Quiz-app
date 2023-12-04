<template>
	<header class="header w-full bg-white">
		<div class="container">
			<nav class="navbar py-2 flex justify-between items-center">
				<div class="brand">
					<a href="">Easy<span>Quiz</span></a>
					<button @click.prevent="navbarStore.showNavbarHandler(true)" class="nav-btn"></button>
				</div>
				<div v-if="navbarStore.showNavbar || !navbarStore.mobile" class="nav flex">
					<div class="brand-mobile">
						<a href="">Easy<span>Quiz</span></a>
						<button @click.prevent="navbarStore.showNavbarHandler(false)" class="close-btn"></button>
					</div>
					<ul class="menu flex font-medium">
						<li class="item">
							<RouterLink :to="{ name: 'home' }" class="item-link">Home</RouterLink>
						</li>
						<li class="item"><a href="#about" class="item-link">About Us</a></li>
						<li class="item"><a href="#contacts" class="item-link">Contacts</a></li>
						<li class="item">
							<RouterLink :to="{ name: 'create-quiz' }" class="item-link">Create Quiz</RouterLink>
						</li>
					</ul>
					<a class="login-btn bg-transparent border-2 border-black rounded-lg cursor-pointer px-8 py-2">Log In</a>
				</div>
			</nav>


		</div>

	</header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNavbarStore } from '@/stores/navbarStore'
const navbarStore = useNavbarStore()
const windowWith = ref<number>();
function checkScreen() {
	windowWith.value = window.innerWidth;
	if (+windowWith.value <= 820) {
		navbarStore.assignMobile(true)
		return
	}
	navbarStore.assignMobile(false)
	navbarStore.showNavbarHandler(false)
}
window.addEventListener('resize', checkScreen);
</script>

<style scoped lang="scss">
.header {
	position: fixed;
	z-index: 5;
}

@media(max-width:819px) {
	.navbar {

		.nav {
			position: absolute;
			height: 100vh;
			background-color: #fff;
			width: 60%;
			left: 0;
			top: 0;
			padding: 10px 0px;
			display: block;

			&::before {
				content: '';
				position: absolute;
				width: 100vw;
				height: 100vh;
				background-color: rgba(7, 34, 47, 0.70);
				top: 0;
				left: 0;
				bottom: 0;
				z-index: -1;
			}
		}

		.menu {
			flex-direction: column;
		}

		.nav-btn {
			display: inline-block;
		}

		.brand {
			flex-grow: 1;
		}

		.brand-mobile {
			padding: 0 15px;
			display: flex;
		}

		.item {
			padding: 0;
			margin-right: 0;

			.item-link {
				padding: 10px 15px;

				&:hover {
					background-color: #2f424b49;
				}
			}
		}



		.login-btn {
			margin: 10px 15px 0;
		}
	}


}

.brand,
.brand-mobile {
	font-family: 'Henny Penny', serif;
	font-size: 32px;
	display: flex;
	align-items: center;
	justify-content: space-between;


	span {
		color: #8F95A5;
	}
}

.brand-mobile {
	display: none;
}

.nav-btn,
.close-btn {
	width: 35px;
	height: 35px;
	background-repeat: no-repeat;
	background-position: center;
	outline: none;

}

.nav-btn {
	background-image: url(@/assets/images/nav-btn.svg);
	display: none;
}

.close-btn {
	background-image: url(@/assets/images/close-btn.svg);
}

.login-btn {
	font-size: 20px;
	display: inline-block;
	transition: all 0.4s ease;

	&:hover {
		background-color: #263238;
		color: #fff;
	}
}

.item {
	padding: 5px;
	margin-right: 15px;

	.item-link {
		font-size: 20px;
		padding: 5px 5px 2px;
		display: inline-block;
		transition: all 0.3s ease-in-out;
		border-bottom: 2px solid #fff;
		width: 100%;

		&:hover {
			border-color: #000;
		}
	}
}
</style>
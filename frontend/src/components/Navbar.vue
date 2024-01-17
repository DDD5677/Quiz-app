<template>
	<header class="header w-full bg-white">
		<div class="container">
			<nav class="navbar py-2 flex justify-between items-center"
				:class="{ 'mobile-navbar': navbarStore.showNavbar || !navbarStore.mobile }">
				<div class="brand">
					<RouterLink :to="{ name: 'home' }" @click="clickBrand">Easy<span>Quiz</span></RouterLink>
					<button @click.prevent="navbarStore.showNavbarHandler(true)" class="nav-btn"></button>
				</div>
				<Transition>
					<div v-if="navbarStore.showNavbar || !navbarStore.mobile" class="nav flex">
						<div class="brand-mobile">
							<RouterLink :to="{ name: 'home' }" @click="clickBrand">Easy<span>Quiz</span></RouterLink>
							<button @click.prevent="navbarStore.showNavbarHandler(false)" class="close-btn"></button>
						</div>
						<ul class="menu flex font-medium">
							<li class="item">
								<RouterLink :to="{ name: 'home' }" @click="clickBrand" class="item-link">Home</RouterLink>
							</li>
							<li @click="navbarStore.showNavbarHandler(false)" class="item"><a href="#about"
									class="item-link">About
									Us</a></li>
							<li @click="navbarStore.showNavbarHandler(false)" class="item"><a href="#contacts"
									class="item-link">Contacts</a></li>
							<li v-if="authStore.isLogged && authStore.user.role === 'student'" @click="logoutAdmin" class="item">
								<span class="logout-btn">Log out <i class="fa-solid fa-arrow-right-from-bracket"></i></span>
							</li>
							<li v-if="authStore.isLogged && authStore.user.role === 'teacher'" class="item">
								<RouterLink :to="{ name: 'admin' }" @click="navbarStore.showNavbarHandler(false)"
									class="item-link">
									Dashboard</RouterLink>
							</li>
						</ul>
						<RouterLink @click="navbarStore.showNavbarHandler(false)" v-if="!authStore.isLogged"
							:to="{ name: 'login' }"
							class="login-btn font-medium bg-transparent border-2 border-black rounded-lg cursor-pointer px-8 py-2">
							Log In
						</RouterLink>
					</div>
				</Transition>
			</nav>


		</div>

	</header>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useNavbarStore } from '@/stores/navbarStore'
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
const router = useRouter()
const authStore = useAuthStore()
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

function clickBrand() {
	navbarStore.showNavbarHandler(false)
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}
const logoutAdmin = () => {
	router.replace('/')
	authStore.logout();
}
onMounted(() => {
	checkScreen()
})
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
	transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	transform: translateX(-100%);
}

.header {
	position: fixed;
	z-index: 5;

	.nav {
		background-color: #fff;
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

.logout-btn {
	width: 100%;
	height: 100%;
	padding: 5px 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	border-bottom: 2px solid #fff;
	border-top: 2px solid #fff;
	border-left: 1px solid #fff;
	border-right: 1px solid #fff;
	border-radius: 10px;
	cursor: pointer;
	transition: all 0.3s ease-in-out;

	&:hover {
		border-color: #000;
	}

	i {
		margin-left: 10px;
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

@media(max-width:819px) {
	.navbar {

		.nav {
			position: absolute;
			height: 100vh;

			width: 60%;
			left: 0;
			top: 0;
			padding: 8px 0px;
			display: block;

		}

		&.mobile-navbar::after {
			content: '';
			position: absolute;
			width: 100vw;
			height: 100vh;
			background-color: rgba(7, 34, 47, 0.49);
			top: 0;
			left: 0;
			bottom: 0;
			z-index: -1;
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
			padding: 0 10px;
			display: flex;
		}

		.item {
			padding: 0;
			margin-right: 0;

			.item-link {
				padding: 10px 15px;
				border-bottom: 0;

				&:hover {
					background-color: #2f424b49;
				}
			}
		}

		.logout-btn {
			padding: 10px 15px;
			border: none;
			border-radius: 0;
			justify-content: flex-start;

			&:hover {
				background-color: #2f424b49;
			}
		}

		.login-btn {
			margin: 10px 15px 0;
		}
	}
}

@media(max-width:480px) {
	.navbar {
		.nav {
			width: 80%;
		}

	}
}
</style>
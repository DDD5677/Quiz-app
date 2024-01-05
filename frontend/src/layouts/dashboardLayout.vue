<template>
	<section class="dashboarad" :class="{ 'dark': navbarStore.darkTheme }">
		<div class="sidebar bg-white dark:bg-slate-900">
			<ul class="menu text-slate-900 dark:text-stone-100">
				<li class="item">
					<RouterLink :to="{ name: 'create-quiz' }"
						class="item-link hover:bg-stone-100 focus:bg-stone-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700">
						<i class="fa-solid fa-square-plus"></i>
						<Transition>
							<span v-if="!navbarStore.mobile && !navbarStore.showNavbar">Create Quiz</span>
						</Transition>
					</RouterLink>
				</li>
				<li class="item">
					<RouterLink v-if="!authStore.isLoading" :to="{ name: 'library', query: { user: authStore.user?.id } }"
						class="item-link hover:bg-stone-100 focus:bg-stone-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700">
						<i class="fa-solid fa-book"></i>
						<Transition>
							<span v-if="!navbarStore.mobile && !navbarStore.showNavbar">Library</span>
						</Transition>
					</RouterLink>
				</li>
				<li class="item">
					<RouterLink :to="{ name: 'create-quiz' }"
						class="item-link hover:bg-stone-100 focus:bg-stone-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700">
						<i class="fa-solid fa-people-roof"></i>
						<Transition>
							<span v-if="!navbarStore.mobile && !navbarStore.showNavbar">Classes</span>
						</Transition>
					</RouterLink>
				</li>
				<li class="item">
					<RouterLink :to="{ name: 'settings' }"
						class="item-link hover:bg-stone-100 focus:bg-stone-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700">
						<i class="fa-solid fa-gear"></i>
						<Transition>
							<span v-if="!navbarStore.mobile && !navbarStore.showNavbar">Settings</span>
						</Transition>
					</RouterLink>
				</li>
			</ul>
		</div>
		<div class="content bg-stone-100 dark:bg-slate-700"
			:style="!navbarStore.mobile && !navbarStore.showNavbar ? 'padding-left:180px' : ''">
			<div class="navbar bg-white dark:bg-slate-900">
				<div class="brand">
					<button v-if="!navbarStore.mobile" @click.prevent="sidebarToggle" class="sidebar-btn"
						:class="{ 'mobile': navbarStore.showNavbar }"></button>
					<RouterLink class="text-black dark:text-stone-100" :to="{ name: 'home' }">Easy<span
							class="text-slate-400">Quiz</span>
					</RouterLink>
				</div>
				<input type="text" placeholder="Search quiz" class="search bg-stone-100 dark:bg-slate-700 dark:text-stone-100">
				<ToggleTheme />
				<div v-if="!authStore.isLoading" @click="toggleDropdown"
					class="avatar bg-slate-800 text-white dark:bg-slate-600">
					<span v-if="authStore.user.image" class="avatar-link">
						<img :src="authStore.user.image" alt="">
					</span>
					<span v-else>{{ authStore.user.firstname[0] }}</span>
				</div>
				<Transition name="fade">
					<div v-if="dropdown" @click="logoutAdmin"
						class="dropdown text-slate-950 dark:text-stone-100 bg-stone-100 dark:bg-slate-900">
						<span class="logout">Log Out <i class="fa-solid fa-arrow-right-from-bracket"></i></span>
					</div>
				</Transition>
			</div>
			<div class="slot">
				<InfoActiveAction v-if="actionStore.activeAction" />
				<slot></slot>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import ToggleTheme from '@/components/UI/ToggleTheme.vue';
import InfoActiveAction from '@/components/InfoActiveAction.vue';
import { useActionStore } from '@/stores/actionStore';
import { useAuthStore } from '@/stores/authStore';
import { useNavbarStore } from '@/stores/navbarStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();
const navbarStore = useNavbarStore();
const actionStore = useActionStore()
const windowWith = ref<number>();
//logout
const dropdown = ref(false);
const toggleDropdown = () => {
	dropdown.value = !dropdown.value
}
const logoutAdmin = () => {
	router.replace('/')
	authStore.logout();
}
//responsibility
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

const sidebarToggle = () => {
	navbarStore.showNavbarHandler(!navbarStore.showNavbar)
}

</script>

<style scoped lang="scss">
//transition of dropdown
.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translate(5px, -5px);
}

//transition of sidebar
.v-enter-active {
	transition: all 0.5s ease-in;

}

.v-leave-active {
	transition: all 0.3s ease-in;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}

.active_action {
	margin-top: 20px;
}

.sidebar {
	position: fixed;
	left: 0;
	top: 0;
	height: 100vh;
	box-shadow: 0 2px 4px #00000014;
	z-index: 4;

	.menu {
		margin-top: 50px;

		.item-link {
			display: inline-block;
			width: 100%;
			font-size: 20px;

			span {
				display: inline-block;
				padding: 5px 10px 5px 0;
				width: 130px;
			}

			i {
				padding: 10px;
				width: 45px;
				text-align: center;
			}


		}
	}
}

.content {
	padding-left: 45px;
	padding-top: 50px;
	min-height: 100vh;
	transition: padding 0.6s ease-in-out;

	.navbar {
		display: flex;
		gap: 20px;
		justify-content: space-between;
		align-items: center;
		padding: 10px 5px;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		height: 50px;
		z-index: 5;
		-webkit-box-shadow: -1px 14px 11px -11px rgba(38, 50, 56, 0.18);
		-moz-box-shadow: -1px 14px 11px -11px rgba(38, 50, 56, 0.18);
		box-shadow: -1px 14px 11px -11px rgba(38, 50, 56, 0.18);

		.brand {
			font-family: 'Henny Penny', serif;
			font-size: 28px;
			margin: 0 5px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px 0;
			gap: 20px;

			.sidebar-btn {
				width: 30px;
				height: 30px;
				background-image: url(@/assets/images/nav-btn.svg);
				background-repeat: no-repeat;
				background-position: center;
				background-size: contain;
				transition: all 0.4s ease-in;

				&.mobile {
					transform: rotateY(180deg)
				}
			}

		}

		.search {
			border-radius: 5px;
			flex-grow: 1;
			padding: 5px 10px;

			&::placeholder {
				color: #8F95A5;
			}
		}

		// .theme {
		// 	.light_theme {
		// 		&:hover {
		// 			background-color: rgb(2 6 23);
		// 		}
		// 	}

		// 	button {
		// 		border-radius: 50%;
		// 		width: 40px;
		// 		height: 40px;
		// 		display: flex;
		// 		align-items: center;
		// 		justify-content: center;
		// 		font-size: 20px;
		// 	}
		// }

		.avatar {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			overflow: hidden;
			font-size: 20px;
			font-weight: 500;
			border-radius: 50%;

			.avatar-link {
				height: 100%;
				width: 100%;

				img {
					height: 100%;
					width: 100%;
					object-fit: cover;
				}
			}
		}

		.dropdown {
			padding: 10px 15px;
			border-radius: 5px;
			cursor: pointer;
			position: absolute;
			right: 10px;
			top: 58px;
			z-index: 99999;
			-webkit-box-shadow: -2px 1px 8px 2px rgba(34, 60, 80, 0.2);
			-moz-box-shadow: -2px 1px 8px 2px rgba(34, 60, 80, 0.2);
			box-shadow: -2px 1px 8px 2px rgba(34, 60, 80, 0.2);


			.logout {
				font-size: 18px;
				font-weight: 500;
			}

			i {
				margin-left: 10px;
			}
		}
	}

}
</style>
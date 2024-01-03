<template>
	<section class="dashboarad">
		<div class="sidebar">
			<ul class="menu">
				<li class="item">
					<RouterLink :to="{ name: 'create-quiz' }" class="item-link">
						<i class="fa-solid fa-square-plus"></i>
						<Transition>
							<span v-if="!navbarStore.mobile">Create Quiz</span>
						</Transition>
					</RouterLink>
				</li>
				<li class="item">
					<RouterLink v-if="!authStore.isLoading" :to="{ name: 'library', query: { user: authStore.user.id } }"
						class="item-link">
						<i class="fa-solid fa-book"></i>
						<Transition>
							<span v-if="!navbarStore.mobile">Library</span>
						</Transition>
					</RouterLink>
				</li>
				<li class="item">
					<RouterLink :to="{ name: 'create-quiz' }" class="item-link">
						<i class="fa-solid fa-people-roof"></i>
						<Transition>
							<span v-if="!navbarStore.mobile">Classes</span>
						</Transition>
					</RouterLink>
				</li>
				<li class="item">
					<RouterLink :to="{ name: 'settings' }" class="item-link">
						<i class="fa-solid fa-gear"></i>
						<Transition>
							<span v-if="!navbarStore.mobile">Settings</span>
						</Transition>
					</RouterLink>
				</li>
			</ul>
		</div>
		<div class="content" :style="!navbarStore.mobile ? 'padding-left:180px' : ''">
			<div class="navbar">
				<div class="brand">
					<button @click.prevent="sidebarToggle" class="sidebar-btn"
						:class="{ 'mobile': navbarStore.mobile }"></button>
					<RouterLink :to="{ name: 'home' }">Easy<span>Quiz</span></RouterLink>
				</div>
				<input type="text" placeholder="Search quiz" class="search">

				<div v-if="!authStore.isLoading" class="avatar">
					<a v-if="authStore.user.image" href="authStore.user.image" class="avatar-link">
						<img :src="authStore.user.image" alt="">
					</a>
					<span v-else>{{ authStore.user.firstname[0] }}</span>
				</div>
			</div>
			<div class="slot">
				<InfoActiveAction v-if="actionStore.activeAction" />
				<slot></slot>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import InfoActiveAction from '@/components/InfoActiveAction.vue';
import { useActionStore } from '@/stores/actionStore';
import { useAuthStore } from '@/stores/authStore';
import { useNavbarStore } from '@/stores/navbarStore';
import { ref } from 'vue';
const authStore = useAuthStore();
const navbarStore = useNavbarStore();
const actionStore = useActionStore()
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

const sidebarToggle = () => {
	navbarStore.assignMobile(!navbarStore.mobile)
}
</script>

<style scoped lang="scss">
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
	background-color: #fff;
	z-index: 4;

	.menu {
		margin-top: 50px;

		.item-link {
			display: inline-block;
			width: 100%;
			color: #263238;
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

			&:hover,
			&:focus {
				background-color: #f2f2f2;

			}
		}
	}
}

.content {
	padding-left: 45px;
	padding-top: 50px;
	min-height: 100vh;
	background-color: #f2f2f2;
	transition: padding 0.6s ease-in-out;

	.navbar {
		background-color: #fff;
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

			span {
				color: #8F95A5;
			}
		}

		.search {
			border-radius: 5px;
			flex-grow: 1;
			background-color: #f2f2f2;
			padding: 5px 10px;

			&::placeholder {
				color: #8F95A5;
			}
		}

		.avatar {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			overflow: hidden;
			font-size: 20px;
			font-weight: 500;
			background-color: #263238;
			color: #fff;
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
	}

}
</style>
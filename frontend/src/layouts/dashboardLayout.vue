<template>
	<section class="dashboarad">
		<div class="sidebar">
			<div class="brand">
				<button class="sidebar-btn"></button>
				<RouterLink :to="{ name: 'home' }">Easy<span>Quiz</span></RouterLink>
			</div>
			<ul class="menu">
				<li class="item">
					<RouterLink :to="{ name: 'create-quiz' }" class="item-link">
						<i class="fa-solid fa-square-plus"></i>
						<span>Create Quiz</span>
					</RouterLink>
				</li>
				<li class="item">
					<RouterLink :to="{ name: 'create-quiz' }" class="item-link">
						<i class="fa-solid fa-book"></i> <span>Library</span>
					</RouterLink>
				</li>
				<li class="item">
					<RouterLink :to="{ name: 'create-quiz' }" class="item-link">
						<i class="fa-solid fa-people-roof"></i> <span>Classes</span>
					</RouterLink>
				</li>
				<li class="item">
					<RouterLink :to="{ name: 'create-quiz' }" class="item-link">
						<i class="fa-solid fa-gear"></i> <span>Settings</span>
					</RouterLink>
				</li>
			</ul>
		</div>
		<div class="content">
			<div class="navbar">
				<input type="text" placeholder="Search quiz" class="search">

				<div v-if="!authStore.isLoading" class="avatar">
					<a href="" class="avatar-link">
						<!-- <img src="" alt=""> -->
						<span>{{ authStore.user.firstname[0] }}</span>
					</a>
				</div>
			</div>
			<div class="slot">
				<slot></slot>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore';
// import { useRouter } from 'vue-router'
// const router = useRouter();
const authStore = useAuthStore();


</script>

<style scoped lang="scss">
.sidebar {
	position: fixed;
	left: 0;
	top: 0;
	height: 100vh;
	width: 200px;
	box-shadow: 0 2px 4px #00000014;
	background-color: #fff;
	z-index: 6;

	.brand {
		font-family: 'Henny Penny', serif;
		font-size: 28px;
		margin: 0 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 0;

		.sidebar-btn {
			width: 30px;
			height: 30px;
			background-image: url(@/assets/images/nav-btn.svg);
			background-repeat: no-repeat;
			background-position: center;
			background-size: contain;
		}

		span {
			color: #8F95A5;
		}
	}


	.menu {
		margin-top: 20px;

		.item-link {
			display: inline-block;
			width: 100%;
			padding: 5px 10px 5px 0;
			color: #263238;
			font-size: 20px;

			i {
				padding: 10px;
				width: 40px;
			}

			&:hover,
			&:focus {
				background-color: #f2f2f2;

			}
		}
	}
}

.content {
	padding-left: 200px;
	padding-top: 50px;
	height: 100vh;
	background-color: #f2f2f2;

	.navbar {
		background-color: #fff;
		display: flex;
		gap: 20px;
		justify-content: space-between;
		align-items: center;
		padding: 10px 5px 10px 205px;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		height: 50px;
		z-index: 5;

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
			a {
				border-radius: 50%;
				border: 2px solid #263238;
				width: 40px;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 20px;
				font-weight: 500;
				background-color: #263238;
				color: #fff;
			}
		}
	}

}
</style>
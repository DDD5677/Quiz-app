<template>
	<section class="dashboarad">
		<div class="sidebar">
			<div class="brand">
				<button class="sidebar-btn"></button>
				<RouterLink :to="{ name: 'home' }">Easy<span>Quiz</span></RouterLink>
			</div>
			<div class="btns">
				<i class="btn-icon fa-solid fa-square-plus"></i>
				<dark-button><i class="fa-regular fa-square-plus"></i> Create Quiz</dark-button>
			</div>
			<ul class="menu">
				<li class="item"><i class="fa-solid fa-book"></i> <span>Library</span></li>
				<li class="item"><i class="fa-solid fa-people-roof"></i> <span>Classes</span></li>
				<li class="item"><i class="fa-solid fa-gear"></i> <span>Settings</span></li>
			</ul>
		</div>
		<div class="content">
			<div class="navbar">
				<input type="text" placeholder="Search quiz" class="search">
				<div class="avatar">Decco</div>
			</div>
			<div class="slot">
				<slot></slot>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {


		return {}
	}
})
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

	.btns {
		margin-top: 20px;
		display: flex;
		align-items: center;

		.dark-btn {
			margin-left: 10px;
		}

		.btn-icon {
			display: inline-block;
			padding: 10px;
			color: #263238;
			font-size: 20px;
			width: 40px;
			display: none;
		}
	}

	.menu {

		.item {
			padding: 5px 10px 5px 0;
			cursor: pointer;
			color: #263238;
			font-size: 20px;

			i {
				padding: 10px;
				width: 40px;
			}

			&:hover {
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
	}

}
</style>
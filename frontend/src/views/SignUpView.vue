<template>
	<section class="signinView">
		<div class="container">
			<div class="wrapper">
				<form action="">
					<div class="icon"><i class="fa-regular fa-user"></i></div>
					<h1 class="title">Create account</h1>
					<main-input type="text" placeholder="Name" />
					<main-input type="text" placeholder="Surname" />
					<main-input type="text" placeholder="Email" />
					<main-input type="text" placeholder="Phone" />
					<main-input type="text" placeholder="Password" />
					<main-input type="text" placeholder="Confirm password" />
					<dark-button>Sign In</dark-button>
				</form>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import type { RouterLink } from 'vue-router';


</script>

<style lang="scss" scoped>
.signinView {
	padding-top: 80px;
	min-height: 100vh;
	background-color: #f2f2f2;

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	form {
		width: 450px;
		padding: 20px 50px 15px;
		border-radius: 10px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;

		.icon {
			font-size: 30px;
			text-align: center;
			color: #dfdede;
		}

		.title {
			font-size: 22px;
			font-weight: 500;
			text-align: center;
			margin-bottom: 10px;
		}

		.main-input {
			width: 100%;
			margin-bottom: 10px;
			background-color: #f2f2f2;
			padding: 10px 15px;
		}

		.dark-btn {
			width: 150px;
			margin-bottom: 10px;
		}
	}
}
</style>
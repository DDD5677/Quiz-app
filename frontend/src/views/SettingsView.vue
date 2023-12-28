<template>
	<section class="settings">
		<div class="container">
			<h1 class="title">Settings</h1>
			<div class="wrapper">
				<form v-if="!authStore.isLoading" action="" @submit.prevent="updateSettingsHandler">
					<div class="avatar input">
						<div class="img_box">
							<img src="" alt="">
							<span>{{ authStore.user.firstname[0] }}</span>
						</div>
						<div class="upload_img">
							<i class="fa-regular fa-image"></i>
							Upload image
						</div>
					</div>
					<div class="input">
						<span class="subtitle">Firstname</span>
						<main-input required type="text" placeholder="Firstname" v-model="user.firstname" />
						<span class="error"></span>
					</div>
					<div class="input">
						<span class="subtitle">Lastname</span>
						<main-input required type="text" placeholder="Lastname" v-model="user.lastname" />
						<span class="error"></span>
					</div>
					<div class="input">
						<span class="subtitle">Email</span>
						<main-input required type="email" placeholder="Email" v-model="user.email" />
						<span class="error"></span>
					</div>
					<div class="input">
						<span class="subtitle">Phone</span>
						<main-input required type="text" placeholder="Phone" v-model="user.phone" />
						<span class="error"></span>
					</div>
					<div class="input">
						<span class="subtitle">User Role</span>
						<select name="" id="" class="main-select" v-model="user.role">
							<option value="" selected disabled hidden>Who are you?</option>
							<option value="student">Student</option>
							<option value="teacher">Teacher</option>
						</select>
						<span class="error">{{ authStore.errors ? authStore.errors.role : '' }}</span>
					</div>
					<div class="input">
						<span class="subtitle">Password</span>
						<main-input type="text" placeholder="Password" v-model="user.password" />
						<span class="error">{{ authStore.errors ? authStore.errors.password : '' }}</span>
					</div>
					<div class="input">
						<span class="subtitle">Confirm Password</span>
						<main-input type="text" placeholder="Confirm password" v-model="user.confirmPassword" />
						<span class="error">{{ authStore.errors ? authStore.errors.password : '' }}</span>
					</div>
					<dark-button>Update</dark-button>
				</form>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useQuizStore } from '@/stores/quizStore'
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import type { Quiz } from '@/types/quizType'
const router = useRouter();
const authStore = useAuthStore()
const quizStore = useQuizStore()
const user = reactive({
	firstname: '',
	lastname: '',
	email: '',
	phone: '',
	password: '',
	confirmPassword: '',
	role: '',
	image: null
})


function updateSettingsHandler() {
	const data = {
		...user
	}
	console.log(data)
}
</script>

<style lang="scss" scoped>
.title {
	font-size: 25px;
	margin: 20px 0 10px;
}

.wrapper {
	background-color: #fff;
	padding: 20px;
	border-radius: 10px;
	min-height: 80vh;

	form {
		display: flex;
		column-gap: 20px;
		flex-wrap: wrap;
		align-items: center;
	}


	.avatar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 30px;

		.img_box {
			width: 80px;
			height: 80px;
			background-color: #263238;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				display: none;
			}

			span {
				font-size: 48px;
				color: #fff;
			}
		}

		.upload_img {
			border-radius: 10px;
			border: 2px solid #263238;
			padding: 15px 30px;
			cursor: pointer;
			transition: all 0.3s ease;
			font-size: 18px;
			flex-grow: 1;
			text-align: center;
			font-weight: 500;

			&:hover {
				background-color: #f2f2f2;
			}
		}
	}

	.input {
		flex: 1 0 48%;

		.subtitle {
			font-size: 18px;
			font-weight: 500;
		}

		.main-select,
		.main-input {
			width: 100%;
			padding: 10px;
			border-radius: 5px;
			border: 1px solid #8F95A5;
			margin-bottom: 20px;
			background-color: #f2f2f2;
		}
	}

	.dark-btn {
		font-size: 18px;
		width: 150px;
		margin-left: auto;
		padding: 10px 16px;
	}

}
</style>
<template>
	<section class="settings">
		<div class="container">
			<div class="wrapper bg-white dark:bg-slate-800	text-black dark:text-stone-200">
				<h1 class="title">Settings</h1>
				<form v-if="!authStore.isLoading" action="" @submit.prevent="updateSettingsHandler">
					<div class="avatar input">
						<div class="img_box">
							<span class="img_link" v-if="authStore.user.image">
								<a :href="authStore.user.image" target="_blank"><img :src="authStore.user.image" alt=""></a>
								<span class="img_camera" @click="toggleShowUpload(true)"><i class="fa-solid fa-camera"></i></span>
							</span>
							<span v-else class="img_link no_image">
								<span class="img_name">{{ authStore.user.firstname[0] }}</span>
								<span class="img_camera" @click="toggleShowUpload(true)"><i class="fa-solid fa-camera"></i></span>
							</span>
						</div>
						<div class="registered">
							<span class="subtitle">Registered date:</span>
							<span class="date">{{ formatDate(authStore.user.createdAt) }}</span>
						</div>
						<div @click="toggleShowUpload(true)" class="upload_img-mobile">
							<i class="fa-regular fa-image image"></i>
							<i class="fa-solid fa-circle-plus plus"></i>
						</div>
					</div>
					<div class="input">
						<span class="subtitle">Firstname</span>
						<main-input required type="text" placeholder="Firstname" v-model="user.firstname" />
						<span class="error">{{ authStore.errors ? authStore.errors.firstname : '' }}</span>
					</div>
					<div class="input">
						<span class="subtitle">Lastname</span>
						<main-input required type="text" placeholder="Lastname" v-model="user.lastname" />
						<span class="error">{{ authStore.errors ? authStore.errors.lastname : '' }}</span>
					</div>
					<div class="input">
						<span class="subtitle">Email</span>
						<main-input required type="email" placeholder="Email" v-model="user.email" />
						<span class="error">{{ authStore.errors ? authStore.errors.email : '' }}</span>
					</div>
					<div class="input">
						<span class="subtitle">Phone</span>
						<main-input required type="text" placeholder="Phone" v-model="user.phone" />
						<span class="error">{{ authStore.errors ? authStore.errors.phone : '' }}</span>
					</div>
					<div class="input">
						<span class="subtitle">User Role</span>
						<select name="" id=""
							class="main-select border-slate-900 dark:border-stone-100 bg-stone-100 dark:bg-slate-700"
							v-model="user.role">
							<option value="" selected disabled hidden>Who are you?</option>
							<option value="student">Student</option>
							<option value="teacher">Teacher</option>
						</select>
						<span class="error">{{ authStore.errors ? authStore.errors.role : '' }}</span>
					</div>
					<div class="input">
						<span class="subtitle">Password</span>
						<main-input type="password" placeholder="Password" v-model="user.password" />
						<span class="error">{{ authStore.errors ? authStore.errors.password : '' }}</span>
					</div>
					<div class="input">
						<span class="subtitle">New Password</span>
						<main-input type="password" placeholder="New password" v-model="user.newPassword" />
						<span class="error">{{ authStore.errors ? authStore.errors.password : '' }}</span>
					</div>
					<dark-button :isLoading="authStore.isLoading" :disabled="!changed">Update</dark-button>
				</form>
				<loader v-else />
			</div>
		</div>
		<UploadImage v-if="showUpload" @close="toggleShowUpload" :uploadImage="uploadImage" />
	</section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { computed, onMounted, reactive, ref } from 'vue';
import { getItem } from '@/helpers/localStorage';
import UploadImage from '@/components/UI/uploadImage.vue';
const authStore = useAuthStore()
const user = reactive({
	firstname: '',
	lastname: '',
	email: '',
	phone: '',
	password: '',
	newPassword: '',
	role: ''
})

//disable button if nothing is changed
const changed = computed(() => {
	const data = authStore.user;
	return user.firstname !== data.firstname || user.lastname !== data.lastname || user.email !== data.email || user.phone !== data.phone || user.role !== data.role || user.password
})
//update user information
const updateSettingsHandler = () => {
	const data = {
		...user, id: authStore.user.id
	}
	authStore.updateUser(data).then((res) => {
		console.log(res)
	})
}
//upload Image
const showUpload = ref(false)
const toggleShowUpload = (show: boolean) => {
	showUpload.value = show
}
const uploadImage = (image: any) => {
	const data = {
		id: authStore.user.id,
		avatar: image
	}
	authStore.updateUser(data).then((res) => {
		console.log(res)
	})
}
//Date format
const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString(undefined, { year: "numeric", month: "numeric", day: "numeric" })
}
//get user data and show it in settings
const assignUserData = (data: any) => {
	user.firstname = data.firstname;
	user.lastname = data.lastname;
	user.email = data.email;
	user.phone = data.phone;
	user.role = data.role;
}
const token = getItem('token')
onMounted(() => {
	if (token) {
		authStore.refresh().then((user: any) => {
			assignUserData(user)
		})
	}
})
</script>

<style lang="scss" scoped>
.title {
	font-size: 25px;
	font-weight: 500;
	margin-bottom: 10px;
}

.wrapper {
	margin-top: 20px;
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
		gap: 20px;

		.img_box {
			width: 80px;
			height: 80px;
			background-color: #263238;
			border-radius: 50%;

			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}

			.no_image {
				display: flex;
				align-items: center;
				justify-content: center;
			}


			.img_link {
				position: relative;
				height: 100%;
				width: 100%;

				&:hover {
					.img_camera {
						height: 50%;
					}
				}

				.img_camera {
					transition: all 0.3s linear;
					height: 0;
					width: 100%;
					background-color: #ffffff91;
					position: absolute;
					bottom: 0;
					left: 0;
					cursor: pointer;
					text-align: center;
					font-size: 28px;
					mix-blend-mode: screen;
				}

				.img_name {
					font-size: 48px;
					color: #fff;
				}
			}


		}

		.registered {
			display: flex;
			flex-direction: column;
			height: 100%;
			font-size: 18px;
			flex-grow: 1;

			.subtitle {
				margin-bottom: 5px;
			}
		}

		.upload_img-mobile {
			display: none;
			border-radius: 50%;
			border: 2px solid #263238;
			width: 60px;
			height: 60px;
			cursor: pointer;
			transition: all 0.3s ease;
			font-size: 18px;
			align-items: center;
			justify-content: center;
			position: relative;

			.image {
				font-size: 28px;
			}

			.plus {
				position: absolute;
				top: 50%;
				left: 55%;
				background-color: #fff;
				border-radius: 50%;
				height: 15px;
				width: 15px;
			}

			&:hover {
				background-color: #263238;
				color: #fff;

				.plus {
					background-color: #263238;
				}
			}
		}
	}

	.input {
		flex: 1 0 48%;
		position: relative;

		.error {
			width: 100%;
			color: red;
			font-size: 12px;
			position: absolute;
			top: calc(100% - 20px);
			left: 0;
		}

		.subtitle {
			font-size: 20px;
			font-weight: 500;
		}

		.main-select {
			border: 1px solid;
			outline: none;
		}

		.main-select,
		.main-input {
			width: 100%;
			padding: 10px;
			border-radius: 5px;
			margin-bottom: 20px;
			font-size: 18px;
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
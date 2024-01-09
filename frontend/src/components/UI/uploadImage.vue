<template>
	<div class="upload_img bg-slate-950/30 dark:bg-slate-950/50">
		<div class="box">
			<div class="wrapper bg-white dark:bg-slate-700" :class="{ 'active_nav': !navbarStore.mobile }">
				<button @click.prevent="$emit('close', false)" class="close_btn"><i
						class="fa-solid fa-square-xmark"></i></button>
				<form @submit.prevent="submitHandler" action="" enctype="multipart/form-data">
					<label class="title bg-stone-100 dark:bg-slate-500">
						<i class="fa-regular fa-image"></i>
						<span>Choose Image</span>
						<input type="file" @input="changeImage" />
					</label>
					<span class="image_name" ref="imageName"></span>
					<div class="flex justify-end mt-8">
						<dark-button :isLoading="imageCompressing" :disabled="!image || imageCompressing">Change
							Image</dark-button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import imageCompression from 'browser-image-compression';
import { useNavbarStore } from '@/stores/navbarStore';
import { ref } from 'vue';
const props = defineProps({
	uploadImage: {
		required: true,
		type: Function
	}
})
const navbarStore = useNavbarStore()
const image = ref();
const imageName = ref()
const imageCompressing = ref(false);

const changeImage = (event: any) => {
	let inputImage = event.target.files[0];
	const FILE_TYPE_MAP = {
		"image/png": "png",
		"image/jpeg": "jpeg",
		"image/jpg": "jpg",
	} as any;

	if (!inputImage) {
		return
	}
	if (!FILE_TYPE_MAP[inputImage.type]) {
		event.target.value = ''
		alert('Можно загружать только файлы jpeg, jpg и png')
		return
	}
	if (inputImage.size > 10 * 1024 * 1024) {
		event.target.value = ''
		alert('Размер файла должен быть меньше 10 МБ.')
		return
	}
	image.value = inputImage
	imageName.value.innerText = inputImage.name;
}

const submitHandler = async () => {
	imageCompressing.value = true
	if (!image.value) {
		return
	}
	if (image.value.size > 1024 * 1024) {
		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		}
		try {
			const compressedFile = await imageCompression(image.value, options);
			console.log('compressed', compressedFile)
			await props.uploadImage(compressedFile)
			imageCompressing.value = false
		} catch (error) {
			console.log(error);
		}
	} else {
		console.log("orginal", image.value)
		await props.uploadImage(image.value)
		imageCompressing.value = false
	}

}
</script>

<style lang="scss" scoped>
.upload_img {
	top: 0;
	left: 0;
	position: fixed;
	width: 100%;
	height: 100vh;

	.box {
		width: 400px;
		margin: 150px auto;
	}

	.wrapper {
		padding: 50px 40px 30px;
		border-radius: 10px;
		width: 400px;
		position: relative;
		transition: all 0.3s ease-in;

		&.active_nav {
			margin-left: 90px;
		}

		.close_btn {
			position: absolute;
			right: -10px;
			top: -15px;
			font-size: 25px;
			padding: 5px;
			width: 35px;
			height: 35px;
			line-height: 35px;

			&:hover {
				color: #af1818;
			}
		}

		label {
			display: block;
			padding: 10px 20px;
			border-radius: 10px;
			border: 2px solid #263238;
			font-size: 20px;
			margin-bottom: 10px;

			span {
				margin-left: 15px;
			}

			input {
				display: none;
			}

		}

		.dark-btn {
			margin-left: auto;
		}
	}
}
</style>
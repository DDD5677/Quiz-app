<template>
	<section class="empty">
		<!-- <div class="commands-bar">
			<div class="commands">
				<button><i class="fa-solid fa-font"></i></button>
				<button><i class="fa-solid fa-bold"></i></button>
				<button><i class="fa-solid fa-italic"></i></button>
				<button><i class="fa-solid fa-underline"></i></button>
				<button><i class="fa-solid fa-strikethrough"></i></button>
				<button><i class="fa-solid fa-superscript"></i></button>
				<button><i class="fa-solid fa-subscript"></i></button>
				<button><i class="fa-solid fa-infinity"></i></button>
				<button class="equation"><img src="@/assets/images/function.svg" alt=""><span>Formula qo'shish</span></button>
			</div>
		</div> -->
		<slot></slot>
	</section>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.empty {
	background-color: #f2f2f2;
	min-height: 100vh;


	// .commands-bar {
	// 	padding: 10px;
	// 	background-color: #fff;
	// 	-webkit-box-shadow: -2px 15px 25px -32px rgba(34, 60, 80, 1) inset;
	// 	-moz-box-shadow: -2px 15px 25px -32px rgba(34, 60, 80, 1) inset;
	// 	box-shadow: -2px 15px 25px -32px rgba(34, 60, 80, 1) inset;

	// 	.commands {
	// 		display: flex;

	// 		gap: 5px;

	// 		button {
	// 			padding: 5px;
	// 			width: 30px;
	// 			line-height: 20px;
	// 			border-radius: 3px;
	// 			background-color: #f2f2f2;
	// 			transition: all 0.4s ease-in-out;

	// 			&:hover {
	// 				background-color: #263238;
	// 				color: white;
	// 			}
	// 		}

	// 		.equation {
	// 			width: 200px;
	// 			display: flex;
	// 			gap: 5px;

	// 			&:hover {
	// 				img {

	// 					filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
	// 				}
	// 			}

	// 			img {
	// 				width: 20px;
	// 				height: 20px;
	// 				transition: all 0.4s ease-in-out;
	// 			}
	// 		}
	// 	}
	// }
}
</style>
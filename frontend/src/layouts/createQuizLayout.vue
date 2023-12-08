<template>
	<section class="create-quiz">
		<div class="navbar">
			<div class="brand">
				<RouterLink :to="{ name: 'home' }">Easy<span>Quiz</span></RouterLink>
			</div>
			<div class="selects">
				<select name="" id="" class="quiz-type">
					<option value="" selected disabled hidden>Savol turi</option>
					<option value="test">Test</option>
					<option value="fill-in">Bo'sh joyni to'ldirish</option>
				</select>
				<select name="" id="" class="quiz-point">
					<option value="1.1">1.1 ball</option>
					<option value="2.1">2.1 ball</option>
					<option value="3.1">3.1 ball</option>
				</select>
				<select name="" id="">
					<option value="" selected disabled hidden>Savol qaysi fandan</option>
					<option value="math">Matematika</option>
					<option value="english">Ingliz tili</option>
					<option value="history">Tarix</option>
					<option value="physics">Fizika</option>
				</select>
				<select name="" id="">
					<option value="" selected disabled hidden>Qiyinlik darajasi</option>
					<option value="low">Onson</option>
					<option value="medium">O'rtacha</option>
					<option value="hard">Qiyin</option>
					<option value="expert">Juda qiyin</option>
				</select>
			</div>
			<dark-button>Save question</dark-button>
		</div>
		<div class="commands-bar">
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
		</div>
		<slot></slot>
	</section>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.create-quiz {
	background-color: #f2f2f2;
	min-height: 100vh;

	.navbar {
		width: 100%;
		background-color: #fff;
		display: flex;
		padding: 10px;
		align-items: center;
		justify-content: space-between;

		.brand {
			font-family: 'Henny Penny', serif;
			font-size: 28px;
			margin: 0 10px;

			span {
				color: #8F95A5;
			}
		}

		.selects {
			display: flex;
			gap: 10px;

			select {
				padding: 5px;
				border: 2px solid #000;
				border-radius: 5px;
				background-color: #f2f2f2;
			}
		}

	}

	.commands-bar {
		padding: 10px;
		background-color: #fff;
		-webkit-box-shadow: -2px 15px 25px -32px rgba(34, 60, 80, 1) inset;
		-moz-box-shadow: -2px 15px 25px -32px rgba(34, 60, 80, 1) inset;
		box-shadow: -2px 15px 25px -32px rgba(34, 60, 80, 1) inset;

		.commands {
			display: flex;

			gap: 5px;

			button {
				padding: 5px;
				width: 30px;
				line-height: 20px;
				border-radius: 3px;
				background-color: #f2f2f2;
				transition: all 0.4s ease-in-out;

				&:hover {
					background-color: #263238;
					color: white;
				}
			}

			.equation {
				width: 200px;
				display: flex;
				gap: 5px;

				&:hover {
					img {

						filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
					}
				}

				img {
					width: 20px;
					height: 20px;
					transition: all 0.4s ease-in-out;
				}
			}
		}
	}
}
</style>
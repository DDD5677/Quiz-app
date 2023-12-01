<template>
	<header class="py-2 fixed w-full bg-white">
		<div class="container sm:flex justify-between items-center">
			<div class="brand">Easy<span>Quiz</span></div>
			<div class="nav absolute lg:static lg:flex lg:gap-6">
				<ul class="menu lg:flex font-medium">
					<li class="item"><a href="#home" class="item-link">Home</a></li>
					<li class="item"><a href="#about" class="item-link">About Us</a></li>
					<li class="item"><a href="#contacts" class="item-link">Contacts</a></li>
				</ul>
				<a class="login-btn bg-transparent border-2 border-black rounded-lg cursor-pointer px-8 py-2">Log In</a>
			</div>
		</div>

	</header>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
header {
	z-index: 999;


}

@media(max-width:992px) {
	header {
		&:after {
			content: '';
			position: absolute;
			width: 100%;
			height: 100vh;
			background-color: rgba(7, 34, 47, 0.70);
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: -5;
		}
	}

	.nav {
		padding-top: 80px;
		height: 100vh;
		background-color: #fff;
		width: 60%;
		left: 0;
		top: 0;
		z-index: -1;
		padding: 80px 20px 20px 40px;

	}
}

.brand {
	font-family: 'Henny Penny', serif;
	font-size: 32px;

	span {
		color: #8F95A5;
	}
}

.login-btn {
	font-size: 20px;
	display: inline-block;
}

.item {
	padding: 10px 25px;
	font-size: 20px;

	.item-link {
		display: inline-block;
		transition: all 0.3s ease-in-out;
		border-bottom: 2px solid #fff;

		&:hover {
			border-color: #000;
		}
	}
}
</style>
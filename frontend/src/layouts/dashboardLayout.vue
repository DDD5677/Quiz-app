<template>
	<div class="navbar">
		<div class="container">
			<div class="brand">Easy<span>Quiz</span></div>
		</div>
	</div>
	<slot></slot>
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
.brand {
	font-family: 'Henny Penny', serif;
	font-size: 32px;

	span {
		color: #8F95A5;
	}
}

.navbar {
	padding: 10px 0;
}
</style>
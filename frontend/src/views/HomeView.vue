<template>
	<InfoActiveAction v-if="actionStore.activeAction" />
	<Header />
	<About />
	<Contacts />
	<Footer />
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue"
import About from "@/components/AboutUs.vue"
import Contacts from "@/components/Contacts.vue"
import Footer from "@/components/Footer.vue"
import InfoActiveAction from "@/components/InfoActiveAction.vue"
import { useActionStore } from "@/stores/actionStore"

const actionStore = useActionStore()
</script>

<style lang="scss" scoped>
.active_action {
	position: fixed;
	z-index: 15;
	top: 60px;
}
</style>
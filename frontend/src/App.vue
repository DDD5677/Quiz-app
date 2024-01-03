<template>
	<component :is="layout">
		<RouterView />
	</component>
</template>
<script lang="ts">
import mainLayout from "@/layouts/mainLayout.vue";
import dashboardLayout from "@/layouts/dashboardLayout.vue"
import EmptyLayout from "@/layouts/EmptyLayout.vue"
import SignInLayout from "@/layouts/SignInLayout.vue";
import { RouterView } from 'vue-router'
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from "./stores/authStore";
import { getItem } from "./helpers/localStorage";
import { useActionStore } from "./stores/actionStore";
import InfoActiveAction from "./components/InfoActiveAction.vue"
import { useNavbarStore } from "./stores/navbarStore";
export default defineComponent({
	components: {
		mainLayout,
		dashboardLayout,
		EmptyLayout,
		SignInLayout,
		InfoActiveAction
	},
	setup() {
		const authStore = useAuthStore()
		const actionStore = useActionStore()
		const navbarStore = useNavbarStore()
		const route = useRoute()
		const layout = computed(() => {
			return route.meta.layout + 'Layout'
		})
		const darkTheme = getItem('darkTheme')
		const token = getItem('token')
		onMounted(() => {
			if (token) {
				authStore.refresh().then((user: any) => {
					actionStore.getActiveAction(user.id).then((res) => {
						console.log(res)
					}).catch((err) => {
						console.log(err)
					})
				})
			}
			if (darkTheme !== undefined) {
				navbarStore.assignDarkTheme(darkTheme)
			}
		})
		return {
			layout
		}
	}
})
</script>

<style  lang="scss">
.container {
	padding: 0 10px;
	margin: 0 auto;
	max-width: 1280px;
}
</style>

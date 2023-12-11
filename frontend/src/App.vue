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
export default defineComponent({
	components: {
		mainLayout,
		dashboardLayout,
		EmptyLayout,
		SignInLayout
	},
	setup() {
		const authStore = useAuthStore()
		const route = useRoute()
		const layout = computed(() => {
			return route.meta.layout + 'Layout'
		})

		const token = getItem('token')
		onMounted(() => {
			if (token) {
				authStore.refresh()
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

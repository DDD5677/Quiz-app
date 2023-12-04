<template>
	<component :is="layout">
		<RouterView />
	</component>
</template>
<script lang="ts">
import mainLayout from "@/layouts/mainLayout.vue";
import dashboardLayout from "@/layouts/dashboardLayout.vue"
import { RouterView } from 'vue-router'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
	components: {
		mainLayout,
		dashboardLayout
	},
	setup() {
		const route = useRoute()
		const layout = computed(() => {
			return route.meta.layout + 'Layout'
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

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNavbarStore = defineStore('navbar', () => {
  const mobile = ref(false)
  const showNavbar = ref(false)
  //const doubleCount = computed(() => count.value * 2)
  function assignMobile(a:boolean) {
    mobile.value = a;
  }
  function showNavbarHandler(a:boolean){
	showNavbar.value = a;
  }

  return { mobile,showNavbar, assignMobile,showNavbarHandler }
})

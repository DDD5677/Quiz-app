import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { setItem } from '@/helpers/localStorage'

export const useNavbarStore = defineStore('navbar', () => {
  const mobile = ref(false)
  const showNavbar = ref(false)
  const darkTheme = ref(false);

  function assignMobile(a:boolean) {
    mobile.value = a;
  }

  function showNavbarHandler(a:boolean){
	showNavbar.value = a;
  }

  function assignDarkTheme(a:boolean) {
	darkTheme.value = a;
	setItem('darkTheme',a)
 }

  return { mobile,showNavbar,darkTheme, assignMobile,showNavbarHandler,assignDarkTheme }
})

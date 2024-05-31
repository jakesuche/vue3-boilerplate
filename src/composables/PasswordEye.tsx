import { ref } from 'vue'
import EyeClosed from '@/components/icons/EyeClosed.vue'
import EyeOpen from '@/components/icons/EyeOpen.vue'



// Define the composable
export const usePasswordEye = () => {
  const isEyeOpen = ref(false)

  const toggleEye = () => {
    isEyeOpen.value = !isEyeOpen.value
  }

  const PasswordEye = {
    setup() {
      return () => (
        <button onClick={toggleEye} class="password-button absolute right-3 top-[-50%] bottom-[-50%] ">
          {isEyeOpen.value ? <EyeOpen /> : <EyeClosed />}
        </button>
      )
    }
  }

  return { PasswordEye, isPasswordEyeOpen: isEyeOpen }
}

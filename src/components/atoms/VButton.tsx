import { defineComponent } from 'vue'
import type { PropType } from 'vue'

type Button = 'button' | 'submit' | 'reset'
type Variant = 'primary' | 'secondary' | 'dark' | 'light'

interface Props {
  type: Button
  variant?: Variant
}

const VButton = defineComponent({
  props: {
    type: {
      type: String as PropType<Button>,
      default: 'button'
    },
    variant: {
      type: String as PropType<Variant>,
      required: false
    }
  },
  setup({ type }: Props) {
    return () => (
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type={`${type}`}
      ></button>
    )
  }
})

export default VButton

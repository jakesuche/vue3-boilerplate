// src/components/TextInput.tsx
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Props {
  label?: string
  name?: string
  type?: string
  value?: string
  placeholder?: string
  onBlur?: (event: FocusEvent) => void
  onFocus?: (event: FocusEvent) => void
}

const Toggle = defineComponent({
  props: {
    label: { type: String as PropType<Props['label']>, required: false },
    name: { type: String as PropType<Props['name']>, required: false },
   
  },
  emits: ['update:modelValue'],
  setup(props: Props, { emit }) {
    const handleChange = (e: Event) => {
      const input = e.target as HTMLInputElement
      emit('update:modelValue', input.checked)
    }

    return () => (
      <>
        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">
          {props.label}
        </label>
        <label class="inline-flex items-center cursor-pointer">
          <input name={props.name}  onChange={handleChange} type="checkbox"  class="sr-only peer" />
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          {props.label && (
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{props.label}</span>
          )}
        </label>
      </>
    )
  }
})

export default Toggle

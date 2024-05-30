// src/components/TextInput.tsx
import { usePasswordEye } from '@/composables/PasswordEye'
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

const TextInput = defineComponent({
  props: {
    label: { type: String as PropType<Props['label']>, required: false },
    name: { type: String as PropType<Props['name']>, required: false },
    type: { type: String as PropType<Props['type']>, required: false },
    value: { type: String as PropType<Props['value']>, required: false },
    placeholder: { type: String as PropType<Props['value']>, required: false },
   onBlur: { type: Function as PropType<Props['onBlur']>, required: false },
    onFocus: { type: Function as PropType<Props['onFocus']>, required: false }
    
    
  },
  emits: ['update:modelValue'],
  setup(props: Props, { emit }) {
    const handleChange = (e: Event) => {
      const input = e.target as HTMLInputElement
      emit('update:modelValue', input.value)
    }

    const { PasswordEye, isPasswordEyeOpen } = usePasswordEye()

    return () => (
      <div>
        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">
          {props.label}
        </label>

        <div class="relative">
          <input
            onInput={handleChange}
            id={props.name}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder={props.placeholder}
            name={props.name}
            required
            {...(props.type === 'password'
              ? { type: isPasswordEyeOpen.value ? 'text' : 'password' }
              : {})}
          />
          {props.type === 'password' && <PasswordEye />}
        </div>
      </div>
    )
  }
})

export default TextInput

// VEditable.tsx
import { defineComponent, ref } from 'vue'

export const VEditable = defineComponent({
  props: {
    defaultValue: {
      type: String,
      required: true
    }
  },
  setup(props, { slots }) {
    const isEditing = ref(false)
    const value = ref(props.defaultValue)

    const startEditing = () => {
      isEditing.value = true
    }

    const stopEditing = () => {
      isEditing.value = false
    }

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      value.value = target.value
    }

    const handleBlur = () => {
      stopEditing()
    }

    return () => (
      <div class="relative">
        {isEditing.value ? (
          <input
            class="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="text"
            value={value.value}
            onInput={handleInput}
            onBlur={handleBlur}
            autofocus
          />
        ) : (
          <div class="cursor-pointer" onClick={startEditing}>
            {slots.default ? slots.default() : value.value}
          </div>
        )}
      </div>
    )
  }
})

export const VEditablePreview = defineComponent({
  setup(_, { slots }) {
    return () => (
      <div class="mb-2">
        {slots.default ? slots.default() : <span class="text-gray-500">Preview</span>}
      </div>
    )
  }
})

export const VEditableTextarea = defineComponent({
  setup(_, { slots }) {
    return () => (
      <textarea
        class="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        rows={4}
      >
        {slots.default ? slots.default() : ''}
      </textarea>
    )
  }
})

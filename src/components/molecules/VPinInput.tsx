// HStack.tsx

import { defineComponent, h, nextTick, onMounted, ref, type Ref } from 'vue'

export const HStack = defineComponent({
  setup(_, { slots }) {
    return () => <div class="flex flex-row space-x-4">{slots.default && slots.default()}</div>
  }
})



export const PinInput = defineComponent({
  emits:['update'],
  setup(_, { slots, expose, emit }) {
    const inputRefs: Ref<(HTMLInputElement | null)[]> = ref([])

    onMounted(() => {
      inputRefs.value = inputRefs.value.slice(0, slots.default?.().length || 0)
    })


    const focusNextInput = (index: number) => {
      if (inputRefs.value[index + 1]) {
        inputRefs.value[index + 1]?.focus()
      }
    }

    const focusPrevInput = (index: number) => {
      if (inputRefs.value[index - 1]) {
        inputRefs.value[index - 1]?.focus()
      }
    }

    const handleInput = (event: Event, index: number) => {
      const target = event.target as HTMLInputElement
      emit('update', target.value)
      if (target.value) {
        focusNextInput(index)
      }
     
    }

    const handleDelete = (event: KeyboardEvent, index: number) => {
      if (event.key === 'Backspace' && !inputRefs.value[index]?.value) {
        focusPrevInput(index)
      }
    }

    const getValues = () => {
        return inputRefs.value.map((ref) => ref?.value ?? '').join('')
    }

    



    return () => (
      <div class="flex flex-row space-x-4">
        <button onClick={getValues}>
        click
        </button>
        {slots.default &&
          slots.default().map((child, index) => {
            return h(child, {
              ref: (el: any) => {
                inputRefs.value[index] = el?.inputRef
              },
              key: index,
              class: 'border border-gray-300 rounded w-10 h-10 px-2 text-center',
              type: 'text',
              maxLength: 1,
              onInput: (e: Event) => handleInput(e, index),
              onKeydown: (e: KeyboardEvent) => handleDelete(e, index)
            })
          })}
      </div>
    )
  }
})

export const PinInputField = defineComponent({
  setup(_, { expose }) {
    const inputRef = ref<HTMLInputElement | null>(null)
    expose({ inputRef })

    return () => (
      <input
        class="border border-gray-300 rounded w-10 h-10 px-2 text-center"
        type="text"
        ref={inputRef}
        maxlength={1}
      />
    )
  }
})

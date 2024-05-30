// // src/components/TextInput.tsx
// import { defineComponent } from 'vue'
// import type { PropType } from 'vue'

// interface Props {
//   label?: string
//   name?: string
//   type?: string
//   value?: string
//   checked?:boolean
//   id?: string
// }

// const CheckBox = defineComponent({
//   props: {
//     label: { type: String as PropType<Props['label']>, required: false },
//     name: { type: String as PropType<Props['name']>, required: false },
//     value: { type: String as PropType<Props['name']>, required: false },
//     id: { type: String as PropType<Props['name']>, required: false }
//   },
//   emits: ['update:modelValue'],
//   setup(props: Props, { emit }) {
//     const handleChange = (e: Event) => {
//       const input = e.target as HTMLInputElement
//       emit('update:modelValue', input.value)
//     }

//     return () => (
//       <div class="flex items-center mb-4">
//         <input
//           onChange={handleChange}
//           id={props.id}
//           type="checkbox"
//           value={props.value}
//           class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//         />
//         {props.label && (
//           <label
//             for="default-checkbox"
//             class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//           >
//             {props.label}
//           </label>
//         )}
//       </div>
//     )
//   }
// })

// export default CheckBox

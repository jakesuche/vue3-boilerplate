import { defineComponent, computed } from 'vue'

interface AvatarProps {
  name: string
  src?: string
}

const VAvatar = defineComponent({
  name: 'Avatar',
  props: {
    name: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: false
    }
  },
  setup(props: AvatarProps) {
    const initials = computed(() => {
      const names = props.name.split(' ')
      return names.map((n) => n[0]).join('')
    })

    return () => (
      <div class="flex items-center">
        {props.src ? (
          <img class="w-10 h-10 rounded-full" src={props.src} alt={props.name} />
        ) : (
          <div class="w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded-full">
            {initials.value}
          </div>
        )}
        <span class="ml-3 text-sm font-medium text-gray-700">{props.name}</span>
      </div>
    )
  }
})

export default VAvatar

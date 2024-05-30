
import { defineComponent } from 'vue'


type Props = {
  when: boolean
}

const ShowView = defineComponent({
  props: {
    when: { type: Boolean, required: false }
  },

  setup(props: Props, { slots }) {
    if (!props.when) {
      return null
    }
    return slots.default ? slots.default() : null
  }
})

export default ShowView

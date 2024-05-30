// src/components/HelloWorld.tsx
import { defineComponent } from 'vue'

interface Props {
  msg: string
}

const HelloWorld = defineComponent({
  props: {
    msg: { type: String, required: true } // Mark the prop as required
  },
  setup(props: Props) {
    return () => (
      <div class="justify-center">
        <h1>{props.msg}</h1>
      </div>
    )
  }
})

export default HelloWorld

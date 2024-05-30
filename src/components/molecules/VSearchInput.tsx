// src/components/HelloWorld.tsx
import { defineComponent } from 'vue'

interface Props {
  msg: string
}

const SearchInput = defineComponent({
  props: {
    msg: { type: String, required: true } // Mark the prop as required
  },
  setup(props: Props) {
    return () => (
      <div>
        <h1>{props.msg}</h1>
      </div>
    )
  }
})

export default SearchInput

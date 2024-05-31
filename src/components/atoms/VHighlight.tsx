import { defineComponent,type VNode } from 'vue'

const Highlight = defineComponent({
  props: {
    query: {
      type: String,
      required: true
    },
    styles: {
      type: Object as () => Record<string, string>,
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    const highlightText = (text: string) => {
      return text
        .split(new RegExp(`(${props.query})`, 'gi'))
        .map((part, index) =>
          part.toLowerCase() === props.query.toLowerCase() ? <b key={index}>{part}</b> : part
        )
    }

      const processSlotContent = (slotContent: VNode[]) => {
        return slotContent.map((node) => {
          if (typeof node.children === 'string') {
            return highlightText(node.children)
          } else if (Array.isArray(node.children)) {
            return node.children.map((child) => {
              if (typeof child === 'string') {
                return highlightText(child)
              } else {
                return child
              }
            })
          } else {
            return node.children
          }
        })
      }

    return () => (
      <span
        style={{
          padding: props.styles?.py ?? '1px',
          paddingLeft: props.styles?.px ?? '1px',
          paddingRight: props.styles?.px ?? '1px',
          backgroundColor: props.styles?.bg ?? 'orange.100'
        }}
      >
        {processSlotContent((slots.default && slots.default()) || [])}
      </span>
    )
  }
})

export default Highlight

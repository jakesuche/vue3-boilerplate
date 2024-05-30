import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type * as CSS from 'csstype'

type Props = {
  direction?: CSS.Properties['flexDirection']
  flexWrap: CSS.Properties['flexWrap']
  justifyContent: CSS.Properties['justifyContent']
  alignItems: CSS.Properties['alignItems']
  gap:CSS.Properties['gap']
}

const Flex = defineComponent({
  props: {
    direction: { type: String as PropType<CSS.Properties['flexDirection']>, default: 'row' },
    flexWrap: { type: String as PropType<CSS.Properties['flexWrap']> },
    justifyContent: { type: String as PropType<CSS.Properties['justifyContent']> },
    alignItems: { type: String as PropType<CSS.Properties['alignItems']> },
    gap: { type: String as PropType<CSS.Properties['gap']>,default:'2' }
  },
  setup(props: Props, { slots }) {
    const computedClasses = () => {
      const classes: string[] = []

      if (props.direction) {
        classes.push(`flex-${props.direction}`)
      }
      if (props.flexWrap) {
        classes.push(`flex-${props.flexWrap}`)
      }
      if(props.alignItems){
        classes.push(`items-${props.alignItems}`)
      }
      if(props.justifyContent){
        classes.push(`justify-${props.justifyContent}`)
      }
      if(props.gap){
        classes.push(`gap-${props.gap}`)
      }
      

      return classes.join(' ')
    }

    return () => (
      <div class={` flex ${computedClasses()}`}>{slots.default ? slots.default() : null}</div>
    )
  }
})

export default Flex

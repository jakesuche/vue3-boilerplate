// src/components/Typography.tsx
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

enum VARIANT_BASED_TYPE {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  div = 'div',
  p = 'p',
  span = 'span',
  body = 'span'
}

interface TypographyProps {
  variant?: keyof typeof VARIANT_BASED_TYPE
  type?: keyof typeof VARIANT_BASED_TYPE
  align?: 'center' | 'left' | 'right'
  uppercase?: boolean
  noMargin?: boolean
  textDecoration?: string
  textTransform?: string
  color?: string
  size?: string
  font?: string
  fontWeight?: string
  italic?: boolean
}

const Typography = defineComponent({
  props: {
    variant: { type: String as PropType<keyof typeof VARIANT_BASED_TYPE>, default: 'span' },
    type: { type: String as PropType<keyof typeof VARIANT_BASED_TYPE> },
    align: { type: String as PropType<'center' | 'left' | 'right'> },
    uppercase: { type: Boolean },
    noMargin: { type: Boolean },
    textDecoration: { type: String },
    textTransform: { type: String },
    color: { type: String },
    size: { type: String },
    font: { type: String },
    fontWeight: { type: String },
    italic: { type: Boolean }
  },
  setup(props: TypographyProps, { slots }) {
    const computedClasses = () => {
      const classes = []

      // Add Tailwind CSS classes based on props
      if (props.noMargin) {
        classes.push('m-0')
      }

      if (props.align) {
        classes.push(`text-${props.align}`)
      }

      if (props.uppercase) {
        classes.push('uppercase')
      }

      if (props.italic) {
        classes.push('italic')
      }

      // Add more classes based on other props...

      return classes.join(' ')
    }

    const Component = props.variant || 'span'

    const variantClasses: Record<keyof typeof VARIANT_BASED_TYPE, string> = {
      h1: 'text-4xl font-bold', // Translate variant-based styles to Tailwind CSS classes
      h2: 'text-3xl font-bold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold',
      h5: 'text-lg font-semibold',
      div: 'font-regular', // Define default variant classes for missing types
      body: 'text-md font-regular',
      p: 'text-md font-regular',
      span: 'text-md font-regular'
    }

    return () => (
      <Component
        class={`${variantClasses[props.variant || 'span']} ${computedClasses()}`}
        style={`color: ${props.color}; text-decoration: ${props.textDecoration}; text-transform: ${props.textTransform}; font-size: ${props.size}; font-family: ${props.font}; font-weight: ${props.fontWeight};`}
      >
        {slots.default ? slots.default() : null}
      </Component>
    )
  }
})

export default Typography

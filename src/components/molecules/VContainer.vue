<template>
  <div
    :class="containerClass"
    :style="containerStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ContainerProps {
  disableGutters?: boolean
  maxWidth?: 'lg' | 'md' | 'sm' | 'standard'|false
  backgroundColor?: 'black' | 'white'
}

const props = defineProps<ContainerProps>()

const containerClass = computed(() => {
  const classes = ['box-border', 'mx-auto', 'w-full']

  if (!props.disableGutters) {
    classes.push('px-8', 'md:px-6', 'sm:px-4')
  }

  switch (props.maxWidth) {
    case 'lg':
      classes.push('max-w-screen-lg')
      break
    case 'md':
      classes.push('max-w-screen-md')
      break
    case 'sm':
      classes.push('max-w-screen-sm')
      break
    case 'standard':
        classes.push('max-w-[1300px]')
        break
    case false:
      classes.push('max-w-none')
      break
    default:
      classes.push('max-w-screen-xl') // default max width
  }

  return classes.join(' ')
})

const containerStyle = computed(() => {
  return props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
})
</script>

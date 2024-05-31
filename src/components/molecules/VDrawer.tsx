import { defineComponent, ref, Transition, Teleport, watch } from 'vue'

const DrawerOverlay = defineComponent({
  setup(_, { slots }) {
    return () => (
      <div class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300">
        {slots.default && slots.default()}
      </div>
    )
  }
})

const DrawerContent = defineComponent({
  setup(_, { slots }) {
    return () => (
      <div class="fixed inset-y-0 right-0 z-50 flex items-center justify-end overflow-auto">
        <div class="bg-white h-full w-80 transform transition-transform duration-300">
          {slots.default && slots.default()}
        </div>
      </div>
    )
  }
})

const DrawerCloseButton = defineComponent({
  emits: ['close'],
  setup(_, { emit }) {
    return () => (
      <button
        class="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700"
        onClick={() => emit('close')}
      >
        &times;
      </button>
    )
  }
})

const DrawerHeader = defineComponent({
  setup(_, { slots }) {
    return () => <div class="font-bold text-xl mb-4">{slots.default && slots.default()}</div>
  }
})

const DrawerBody = defineComponent({
  setup(_, { slots }) {
    return () => <div class="mb-4">{slots.default && slots.default()}</div>
  }
})

const DrawerFooter = defineComponent({
  setup(_, { slots }) {
    return () => <div class="flex justify-end">{slots.default && slots.default()}</div>
  }
})

const Drawer = defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    },
    placement: {
      type: String as () => 'left' | 'right' | 'top' | 'bottom',
      default: 'right'
    },
    finalFocusRef: {
      type: Object,
      required: false
    }
  },
  setup(props, { emit, slots }) {
    const isVisible = ref(props.isOpen)

    const handleClose = () => {
      emit('close')
    }

    watch(
      () => props.isOpen,
      (newVal) => {
        if (newVal) {
          isVisible.value = true
          document.body.style.overflow = 'hidden'
        } else {
          setTimeout(() => {
            isVisible.value = false
            document.body.style.overflow = 'auto'
          }, 300) // Match the duration of the animation
        }
      }
    )

    return () => (
      <>
        <Transition
          name="drawer"
          enter-active-class="transition ease-out duration-300"
          leave-active-class="transition ease-in duration-300"
          enter-from-class="opacity-0 translate-x-full"
          enter-to-class="opacity-100 translate-x-0"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 translate-x-full"
        >
          {isVisible.value && (
            <Teleport to="body">
              <DrawerOverlay>
                <DrawerContent>
                  {slots.header && <DrawerHeader>{slots.header()}</DrawerHeader>}
                  <DrawerCloseButton onClose={handleClose} />
                  {slots.body && <DrawerBody>{slots.body()}</DrawerBody>}
                  {slots.footer && <DrawerFooter>{slots.footer()}</DrawerFooter>}
                </DrawerContent>
              </DrawerOverlay>
            </Teleport>
          )}
        </Transition>
      </>
    )
  }
})

export {
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter
}

export default Drawer

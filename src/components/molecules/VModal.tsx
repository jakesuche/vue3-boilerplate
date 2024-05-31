import { defineComponent, ref, watch, Transition, Teleport } from 'vue'
import VButton from '@/components/atoms/VButton'

// usage example 

//  <Modal :isOpen="isOpen" :onClose="onClose">
//        <template #header>
//         Modal Title
//       </template>
//       <template #body>
//         <p class="font-bold mb-4">You can scroll the content behind the modal</p>
//         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
//       </template>
//       <template #footer>
//         <Button @click="onClose">Close</Button>
//         <Button class="ml-2" variant="ghost">Secondary Action</Button>
//       </template>
//         </Modal>

const ModalOverlay = defineComponent({
  setup(_, { slots }) {
    return () => (
      <div class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300">
        {slots.default && slots.default()}
      </div>
    )
  }
})

const ModalContent = defineComponent({
  setup(_, { slots }) {
    return () => (
      <div class="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
        <div class="bg-white rounded shadow-lg p-6 w-full max-w-lg transform transition-transform duration-300">
          {slots.default && slots.default()}
        </div>
      </div>
    )
  }
})

const ModalHeader = defineComponent({
  setup(_, { slots }) {
    return () => <div class="font-bold text-xl mb-4">{slots.default && slots.default()}</div>
  }
})

const ModalCloseButton = defineComponent({
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

const ModalBody = defineComponent({
  setup(_, { slots }) {
    return () => <div class="mb-4">{slots.default && slots.default()}</div>
  }
})

const ModalFooter = defineComponent({
  setup(_, { slots }) {
    return () => <div class="flex justify-end">{slots.default && slots.default()}</div>
  }
})

const useDisclosure = () => {
  const isOpen = ref(false)
  const onOpen = () => {
    isOpen.value = true
  }
  const onClose = () => {
    isOpen.value = false
  }
  return { isOpen, onOpen, onClose }
}

const VModal = defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    }
  },
  setup(props, { emit, slots }) {
    const isVisible = ref(props.isOpen)

    const handleClose = () => {
      props.onClose()
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
          name="modal"
          enter-active-class="transition ease-out duration-300"
          leave-active-class="transition ease-in duration-300"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-4"
        >
          {isVisible.value && (
            <Teleport to="body">
              <ModalOverlay>
                <ModalContent>
                  {slots.header && <ModalHeader>{slots.header()}</ModalHeader>}
                  <VButton click={handleClose}>&times;</VButton>
                  {slots.body && <ModalBody>{slots.body()}</ModalBody>}
                  {slots.footer && <ModalFooter>{slots.footer()}</ModalFooter>}
                </ModalContent>
              </ModalOverlay>
            </Teleport>
          )}
        </Transition>
      </>
    )
  }
})

export default VModal
export {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure
}

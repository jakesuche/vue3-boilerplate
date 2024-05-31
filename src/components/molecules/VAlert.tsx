import { defineComponent } from 'vue'

const VAlertIcon = defineComponent({
  setup() {
    return () => (
      <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 00-2 0v5a1 1 0 102 0v-5zm0 7a1 1 0 100 2 1 1 0 000-2z"
          clip-rule="evenodd"
        ></path>
      </svg>
    )
  }
})

const VAlertTitle = defineComponent({
  setup(props, { slots }) {
    return () => <div class="font-bold">{slots.default && slots.default()}</div>
  }
})

const VAlertDescription = defineComponent({
  setup(props, { slots }) {
    return () => <div>{slots.default && slots.default()}</div>
  }
})

const VAlert = defineComponent({
  props: {
    status: {
      type: String as () => 'error' | 'success' | 'warning' | 'info',
      required: true
    }
  },
  setup(props, { slots }) {
    return () => (
      <div
        class={`p-4 rounded-lg ${
          props.status === 'error'
            ? 'bg-red-100 text-red-600'
            : props.status === 'success'
              ? 'bg-green-100 text-green-600'
              : props.status === 'warning'
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-blue-100 text-blue-600'
        }`}
      >
        {slots.default && slots.default()}
      </div>
    )
  }
})

export default VAlert
export { VAlertIcon, VAlertTitle, VAlertDescription }

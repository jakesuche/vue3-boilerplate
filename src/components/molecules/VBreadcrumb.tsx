import { defineComponent, h } from 'vue'

const Breadcrumb = defineComponent({
  name: 'Breadcrumb',
  setup(props, { slots }) {
    return () => (
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          {slots.default && slots.default()}
        </ol>
      </nav>
    )
  }
})

export default Breadcrumb


export const BreadcrumbItem = defineComponent({
  name: 'BreadcrumbItem',
  props: {
    isCurrentPage: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    return () => (
      <li>
        <div class="flex items-center">
          {!props.isCurrentPage && (
            <>
                /
            </>
          )}
          {slots.default && (
            <span
              class={`ml-1 text-sm font-medium md:ml-2 ${
                props.isCurrentPage ? 'text-gray-500' : 'text-gray-700 hover:text-gray-900'
              }`}
              aria-current={props.isCurrentPage ? 'page' : undefined}
            >
              {slots.default()}
            </span>
          )}
        </div>
      </li>
    )
  }
})
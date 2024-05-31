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
            <svg
              class="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
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
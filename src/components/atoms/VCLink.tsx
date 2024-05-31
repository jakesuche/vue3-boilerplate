import { defineComponent } from "vue";

const VLink = defineComponent({
    props: {
        href:String
    },
    setup(props, ctx) {
        return () => (
          <a href={props.href || '#'} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            {ctx.slots.default && ctx.slots.default()}
          </a>
        )
    },
})

export default VLink
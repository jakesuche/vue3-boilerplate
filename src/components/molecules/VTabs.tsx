// Tabs.vue
import { defineComponent, ref, provide, h,  inject, type Ref, watch } from 'vue'


// example  structure

{/* <Tabs :defaultIndex="1">
      <TabList>
        <Tab value="all">All Transaction</Tab>
        <Tab value="pending">Completed</Tab>
        <Tab value="completed">Pending</Tab>
        <Tab value="failed">Failed</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>All transaction</TabPanel>
        <TabPanel>Completed Content</TabPanel>
        <TabPanel>Pending Content</TabPanel>
        <TabPanel>Failed Content</TabPanel>
      </TabPanels>
    </Tabs> */}

export default defineComponent({
  name: 'Tabs',
  props: {
    defaultIndex: {
      type: Number,
      default: 0
    },
    mt: {
      type: Number,
      default: 0
    }
  },
  emits:['change'],
  setup(props, { slots,emit }) {
    const activeTab = ref(props.defaultIndex)

    const handleTabClick = (index: number, value: string) => {
      activeTab.value = index
      emit('change', value)
      
    }

    provide('activeTab', activeTab)
    provide('handleTabClick', handleTabClick)

     watch(activeTab, (newIndex) => {
       const defaultSlot = slots.default ? slots.default() : []
       const activeTabValue = defaultSlot[newIndex]?.props?.value
       if (activeTabValue) {
         emit('change', activeTabValue)
       }
     })

    return () => (
      <div style={{ marginTop: `${props.mt}px` }}>{slots.default && slots.default()}</div>
    )
  }
})


export const TabList =  defineComponent({
  name: 'TabList',
  setup(_, { slots }) {
    const activeTab = inject('activeTab') as Ref<number>
    console.log(activeTab.value)
    const handleTabClick = inject('handleTabClick') as (index: number, value: string) => void

    return () => (
      <div class="mb-4 border-b border-gray-400 ">
        {slots.default &&
          slots.default().map((child, index) =>
            h(child, {
              index,
              active: index === activeTab.value,
              onClick: () => handleTabClick(index, child.props?.value)
            })
          )}
      </div>
    )
  }
})

interface TabProps {
  value?: string
  active?: boolean
  index?: number

}

export const Tab = defineComponent({
  name: 'Tab',
  props: {
    value: {
      type: String,
      required: false
    },
    active: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      required: false
    }
  },
  emits: ['click'],
  setup(props: TabProps, {emit, slots }) {
    const handleClick = () => {
        emit('click')
    }

    return () => (
      <button
        role="presentation"
        class={`tab  p-2 me-2 ${props.active ? 'border-b border-orange-700' : ''}`}
        onClick={handleClick}
      >
        {slots.default && slots.default()}
      </button>
    )
  }
})


interface TabPanelsProps {
  mt?: number;
}

export const TabPanels = defineComponent({
  name: 'TabPanels',
  props: {
    mt: {
      type: Number,
      default: 0
    }
  },
  setup(props: TabPanelsProps, { slots }) {
    const activeTab = inject('activeTab') as Ref<number>

    return () => (
      <div class="tab-panels" style={{ marginTop: `${props.mt}px` }}>
        {slots.default &&
          slots.default().map((child, index) =>
            h(child, {
              active: index === activeTab.value
            })
          )}
      </div>
    )
  }
})


interface TabPanelProps {
  active?: boolean
}

export const TabPanel = defineComponent({
  name: 'TabPanel',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  setup(props: TabPanelProps, { slots }) {
    return () => (
      <div
        class={`  p-4 rounded-lg   tab-panel  ${props.active ? 'block' : 'hidden'}`}
      >
        {slots.default && slots.default()}
      </div>
    )
  }
})
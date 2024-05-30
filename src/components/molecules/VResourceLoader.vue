<template>
  <div>
    <ShowView :when="!isLoading && hasResult">
      <slot />
    </ShowView>

    <ShowView :when="!isLoading && !hasResult">
      <div>
        <p v-if="noResultMessage">{{ noResultMessage }}</p>
        <template v-else>
          <p>No results to show</p>
        </template>
      </div>
    </ShowView>
  </div>
</template>

<script setup>



import ShowView from '@/components/atoms/VShowView'

const props = defineProps({
   hasResult: {
      type: Boolean,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    loadingText: {
      type: String,
      default: '',
    },
    noResultMessage: {
      type: [String, Object],
      default: '',
    },
    centered: {
      type: Boolean,
      default: false,
    },
});


</script>

<style scoped>
/* Include any additional styles here */
</style>

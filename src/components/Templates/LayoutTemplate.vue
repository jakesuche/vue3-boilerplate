<script setup lang="ts">
  
   import Modal from '@/components/molecules/VModal'
   import { ref } from 'vue';

   const isOpen = ref(false)

   const onClose = () => {
    isOpen.value = false
   }

</script>

<template>
  <main class="bg-gray-200 p-2 h-screen">

        
      <button @click="isOpen = true">
        Open
      </button>
        <Modal :isOpen="isOpen" :onClose="onClose">
       <template #header>
        Modal Title
      </template>
      <template #body>
        <p class="font-bold mb-4">You can scroll the content behind the modal</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </template>
      <template #footer>
        <Button @click="onClose">Close</Button>
        <Button class="ml-2" variant="ghost">Secondary Action</Button>
      </template>
        </Modal>
      
    <slot></slot>
  </main>
</template>

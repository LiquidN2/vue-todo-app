<script setup lang="ts">
import BaseHeader from './BaseHeader.vue'
import BaseFooter from './BaseFooter.vue'
</script>

<template>
  <div
    class="w-[1200px] h-[900px] flex flex-col justify-center items-center bg-black text-[#e5d2c4] rounded-3xl"
  >
    <BaseHeader />
    <slot></slot>
    <BaseFooter />
  </div>
</template>

<template>
  <div>
    <transition name="fade">
      <div v-if="open" class="drawer-overlay bg-color-blue" @click.self="closeDrawer" />
    </transition>

    <transition name="drawer-slide">
      <aside v-if="open" class="drawer bg-color-primary">
        <slot />
      </aside>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{ open: boolean }>()
const emit = defineEmits(['close'])

function closeDrawer() {
  emit('close')
}
</script>

<style scoped lang="scss">
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  opacity: 0.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 0.5;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  padding: 1rem;
  z-index: 1000;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.3s ease;
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}
.drawer-slide-enter-to,
.drawer-slide-leave-from {
  transform: translateX(0);
}


</style>

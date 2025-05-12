<template>
  <div
    ref="tabListRef"
    role="tablist"
    class="wrapper"
    aria-label="Navigation Tabs"
  >
    <div class="tab-indicator" :style="indicatorStyle"/>
    <button
      v-for="{ value, label } in tabs"
      :ref="el => tabRefs.set(value, el)"
      :key="value"
      :class="{
        'rounded-s': true,
        tab: true,
        'tab--selected': value === selectedTab,
      }"
      role="tab"
      :aria-selected="value === selectedTab"
      @click="navigateTo(value)"
    >
      {{ label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Tab } from '@/types/components/tabs'


const props = defineProps<{ tabs: Tab[] }>()

const route = useRoute()
const router = useRouter()


const selectedTab = ref<string>(route.path)

const tabRefs = new Map<string, HTMLElement>()
const tabListRef = ref<HTMLElement | null>(null)
const indicatorStyle = ref({ width: '0px', left: '0px' })


const navigateTo = (value: string) => router.push(value)

watch(
  () => route.path,
  (newPath) => selectedTab.value = newPath,
  { immediate: true }
)


watch(
  selectedTab,
  async () => {
    await nextTick()
    const tabElement = tabRefs.get(selectedTab.value) || tabRefs.get(props.tabs[0]?.value)

    if (tabElement) {
      indicatorStyle.value = {
        width: `${tabElement.offsetWidth}px`,
        left: `${tabElement.offsetLeft}px`,
      }
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (!props.tabs.some(tab => tab.value === selectedTab.value)) {
    selectedTab.value = props.tabs[0]?.value || ''
  }
})
</script>

<style scoped lang="scss">
.wrapper {
  height: 4rem;
  width: fit-content;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
}

.tab {
  cursor: pointer;
  padding: 0.4rem 1rem;
  background-color: transparent;
  border: none;
  color: white;
  font-weight: bold;
  outline: none;
  font-size: 1rem;
  position: relative;
  transition: all 0.3s ease-in-out;
}

.tab--selected {
  color: #ffffff;
  font-weight: bold;
}

.tab-indicator {
  position: absolute;
  bottom: 25%;
  height: 2rem;
  background-color: #4a8fcd80;
  border-radius: 0.3rem;
  transition:
    left 0.3s ease,
    width 0.3s ease;
}
</style>
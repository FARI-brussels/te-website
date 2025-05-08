<template>
  <div
    role="tablist"
    class="vertical-wrapper"
    aria-label="Navigation Tabs"
    ref="tabListRef"
  >
    <div class="vertical-tab-indicator" :style="indicatorStyle" />
    <button
      v-for="{ value, label } in tabs"
      :key="value"
      :ref="el => tabRefs.set(value, el)"
      :class="{
        'tab': true,
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
const indicatorStyle = ref({ height: '0px', top: '0px' })

const navigateTo = (value: string) => router.push(value)

watch(() => route.path, (newPath) => {
  selectedTab.value = newPath
}, { immediate: true })

watch(selectedTab, async () => {
  await nextTick()
  const tabElement = tabRefs.get(selectedTab.value) || tabRefs.get(props.tabs[0]?.value)
  if (tabElement) {
    indicatorStyle.value = {
      height: `${tabElement.offsetHeight}px`,
      top: `${tabElement.offsetTop}px`,
    }
  }
}, { immediate: true })

onMounted(() => {
  if (!props.tabs.some(tab => tab.value === selectedTab.value)) {
    selectedTab.value = props.tabs[0]?.value || ''
  }
})

</script>

<style scoped lang="scss">
.vertical-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 1rem 0;
}

.tab {
  cursor: pointer;
  padding: 0.75rem 1rem;
  background-color: transparent;
  border: none;
  text-align: left;
  color: #ffffff;
  font-weight: 500;
  font-size: 1rem;
  outline: none;
  position: relative;
  transition: all 0.3s ease;
  width: 100%;
}

.tab--selected {
  font-weight: bold;
  color: #ffffff;
}

.vertical-tab-indicator {
  position: absolute;
  left: 0;
  width: 4px;
  background-color: #4a8fcd80;
  border-radius: 0 4px 4px 0;
  transition:
    top 0.3s ease,
    height 0.3s ease;
}

</style>
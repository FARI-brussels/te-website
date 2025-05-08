<template>
  <div class="bg-color-primary wrapper" >
  <THero v-if="currentPage" :imageSrc="currentPage.hero_image" :text="currentPage?.title?.[locale]"/>
  <div class="rounded-sm bg-color-blue mx-xl mt-l p-md flex flex-col items-center justify-center">
    <p class="font-weight-bold"> {{ currentPage?.description[locale] }}</p>
  </div>
  <FariDemoView v-if="!isMobile" :demos="demos"/>
  <div v-else class="flex flex-col items-center justify-center h-screen bg-color-blue-light mx-sm p-md rounded-sm">
      <h3 class="text-2xl font-bold text-center"> For the full experience, visit this site on a desktop</h3>
  </div>
  </div>
</template>

<script setup lang="ts">
import FariDemoView from 'fari-demo-view'

const isMobile = inject('isMobile', ref(false))
const { demos } = storeToRefs(useDemoStore())
const { currentPage } = storeToRefs(usePagesStore())
const { fetchDemos } = useDemoStore()
const { fetchPage } = usePagesStore();
const {locale} = storeToRefs(useGlobalStore())

onMounted(async () => {
  await Promise.all([
    fetchPage('home'),
    fetchDemos()
  ])
})

</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>

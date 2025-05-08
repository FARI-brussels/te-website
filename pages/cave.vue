<template>
  <div class="bg-color-primary wrapper">
    <THero v-if="currentPage" :imageSrc="currentPage.hero_image" :text="currentPage?.title?.[locale]"/>
    <p class="font-weight-bold"> {{ currentPage?.description[locale] }}</p>
  </div>
</template>

<script setup lang="ts">
const { currentPage } = storeToRefs(usePagesStore())
const { fetchPage } = usePagesStore();


onMounted(async () => await fetchPage('cave'))
const { locale } = storeToRefs(useGlobalStore())
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>

<template>
  <div class="bg-color-primary px-sm parent">
    <FAppBar v-if="!isMobile" class="appbar appbar-desktop">
      <template #navigation>
        <img src="/Fari-logo.svg" class="logo" alt="FARI Logo" @click="$router.push('/')">
        <AppBarTabsDesktop :tabs="tabs"/>
      </template>
      <template #actions>
        <FLanguageSelector :locale="'en'" @update:locale="setLocale"/>
      </template>
    </FAppBar>
    <FAppBar v-else class="appbar">
      <template #navigation>
        <img src="/FARI-logo.svg" class="logo" alt="FARI Logo" @click="$router.push('/')">
      </template>
      <template #actions>
        <FButtonIcon
          name="menu"
          class="menu-button"
          small
          @click="drawerOpen = true"
        />
      </template>
    </FAppBar>
    <NavigationDrawer :open="drawerOpen" @close="drawerOpen = false">
      <FLanguageSelector :locale="'en'" @update:locale="setLocale"/>
      <AppBarTabsMobile :tabs="tabs" vertical @tab-clicked="drawerOpen = false" />
    </NavigationDrawer>


    <main class="bg-color-primary main">
      <slot />
    </main>

    <FFooter class="bg-color-primary" />
  </div>
</template>

<script setup lang="ts">
import { FAppBar, FLanguageSelector,FButtonIcon, FFooter } from 'fari-component-library'
const { isMobile } = useDevice()

provide('isMobile', isMobile)
const { locale } = storeToRefs(useGlobalStore())
const { setLocale } = useGlobalStore()

const drawerOpen = ref(false)

const tabs = computed(() => {
  const tabItems = [
            { 
              label: {
                fr: 'Démos',
                en: 'Demos',
                nl: 'Demos',
              }, 
              value: '/' 
            },
            { 
              label: {
                fr: 'Caverne',
                en: 'Cave',
                nl: 'Grot',
              }, 
              value: '/cave' 
            },
            { 
              label: {
                fr: 'À propos',
                en: 'About',
                nl: 'Over',
              }, 
              value: '/about' 
            },
          ]
  return tabItems.map(item => ({
    label: item.label[locale.value],
    value: item.value,
  }))
})          
</script>

<style scoped lang="scss">
.parent {
  box-sizing: border-box;
  width: 100vw;
}
:deep(.language-selector) {
justify-content: center;
}
.appbar {
  width: 96vw;
  padding: 0;
  padding-top: 1rem;
}
.logo {
  width: 100px;
  height: auto;
  margin-left: 20px;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 64px);
  width: 100%;
}
</style>
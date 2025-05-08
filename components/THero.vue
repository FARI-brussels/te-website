<template>
  <section class="hero bg-color-primary">
    <img 
      v-if="imageSrc" 
      :src="imageSrc" 
      class="hero-image rounded-sm" 
      alt="Hero image" 
    >
    <div class="hero-content ">
      <h1 class="hero-title">{{ text }}</h1>
      <div class="hero-buttons" v-if="primaryCta || secondaryCta">
        <FButton v-if="primaryCta" :to="primaryCta.to" class="cta-button">
          {{ primaryCta.label }}
        </FButton>
        <FButton v-if="secondaryCta" :to="secondaryCta.to" class="cta-button" variant="secondary">
          {{ secondaryCta.label }}
        </FButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { FButton } from 'fari-component-library'
import type { Hero } from '@/types/components/hero'

defineProps<Hero>()
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0.4;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  color: #fff;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); // subtle shadow to improve contrast
  margin-bottom: 1.5rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.cta-button {
  min-width: 150px;
}
</style>

import { defineStore } from 'pinia';
import type { Page } from '@/types';

export const usePagesStore = defineStore('pages', () => {
  const pages = ref<Record<string, Page>>({});
  const currentPage = ref<Page | null>(null);

  async function fetchPage(slug: string): Promise<void> {
    if (pages.value[slug]) {
      currentPage.value = pages.value[slug];
      return;
    }

    try {
      const response = await fetch(`/api/fetchPage?slug=${encodeURIComponent(slug)}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.statusMessage || `HTTP error: ${response.status}`);
      }

      const data: Page = await response.json();

      pages.value[slug] = data;
      currentPage.value = data;
    } catch (error) {
      console.error('Error fetching page:', error);
      currentPage.value = null;
      delete pages.value[slug];
      throw error;
    }
  }

  function clearCache(): void {
    pages.value = {};
    currentPage.value = null;
  }

  return { pages, currentPage, fetchPage, clearCache };
});
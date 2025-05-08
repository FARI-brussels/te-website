import type { DirectusDemo } from '@/types'

export const useDemoStore = defineStore('demos', () => {
  const demos = ref<DirectusDemo[]>([])

  async function fetchDemos(){
    const res = await fetch('/api/fetchDemos')
    const json = await res.json()

    demos.value = json
  }

  return { demos, fetchDemos }
})
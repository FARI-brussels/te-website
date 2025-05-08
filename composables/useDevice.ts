import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

export const useDevice = () => {
  const isMobile = breakpoints.smaller('sm')

  return {
    isMobile,
  }
}
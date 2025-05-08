interface Cta {
  label: string
  to: string
}

export interface Hero {
    imageSrc?: string
    text?: string
    primaryCta?: Cta
    secondaryCta?: Cta
}
// Shared button styles and variants
// Used by both Button and CTA_Button components

export const buttonVariants = {
  primary: 'bg-[#FF1E1E] text-white hover:bg-[#FF5555]',
  secondary: 'bg-white/10 text-white hover:bg-white/20',
  outline: 'border border-white/20 text-white hover:bg-white/10',
  ghost: 'text-white hover:bg-white/10',
  danger: 'bg-red-600 text-white hover:bg-red-700',
} as const

export const buttonSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4',
  lg: 'h-12 px-6 text-lg',
} as const

export const ctaButtonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base',
  lg: 'px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg',
} as const

export type ButtonVariant = keyof typeof buttonVariants
export type ButtonSize = keyof typeof buttonSizes
export type CTAButtonVariant = 'primary' | 'secondary'

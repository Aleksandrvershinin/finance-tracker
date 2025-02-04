import { cva, VariantProps } from 'class-variance-authority'

export type TMyInputVariants = VariantProps<typeof myInputVariants>

export const myInputVariants = cva(
  'relative border rounded focus:outline-none focus:ring-2',
  {
    variants: {
      mySize: {
        small: 'px-2 py-1',
        medium: 'px-4 py-2',
        large: 'px-8 py-4',
      },
      sizeText: {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
      },
      myColor: {
        primary: 'border-blue-500 focus:ring-blue-500/50',
        secondary: 'border-gray-500 focus:ring-gray-500/50',
        error: 'border-red-500 focus:ring-red-500/50',
      },
      myDisabled: {
        true: 'bg-gray-200 cursor-not-allowed',
        false: '',
      },
      withIcon: {
        true: 'pl-10',
        false: '',
      },
      withButton: {
        true: 'pr-16',
        false: '',
      },
    },
    defaultVariants: {
      mySize: 'medium',
      sizeText: 'medium',
      myColor: 'primary',
      myDisabled: false,
      withIcon: false,
      withButton: false,
    },
  },
)

import { cva, VariantProps } from 'class-variance-authority'

export type TMyInputVariants = VariantProps<typeof myInputVariants>

export const myInputVariants = cva(
    'relative border rounded focus:outline-none focus:ring-2 w-full',
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
                primary: 'border-gray-300 focus:ring-blue-500',
                secondary: 'border-gray-300 focus:ring-gray-500',
                error: 'border-red-500 focus:ring-red-500',
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

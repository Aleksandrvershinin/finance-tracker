import { cva, VariantProps } from 'class-variance-authority'

export const variants = cva(
    ['transition', 'duration-100', 'ease-in-out', 'hover:shadow-lg'],
    {
        variants: {
            myColor: {
                blue500: ['bg-blue-500', 'text-white'],
                green500: ['bg-green-500', 'text-white'],
                red500: ['bg-red-500', 'text-white'],
                softPurple: ['bg-[--soft-purple]', 'text-white'],
            },
            rounded: {
                rounded: ['rounded'],
                none: [''],
            },
            padding: {
                primary: 'px-3 py-1',
                secondary: 'px-5 py-2',
            },
        },
        defaultVariants: {
            myColor: 'blue500',
            rounded: 'rounded',
            padding: 'secondary',
        },
    },
)

export type Variants = VariantProps<typeof variants>

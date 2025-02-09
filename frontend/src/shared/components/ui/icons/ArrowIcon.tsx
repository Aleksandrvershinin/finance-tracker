export type ArrowIconProps = React.SVGProps<SVGSVGElement> & {
    /** Направление, куда указывает иконка (по умолчанию 'down') */
    direction?: 'left' | 'up' | 'right' | 'down'
    /** Размер иконки в пикселях (например, 24, 32, 48 и т.д.) */
    size?: number
}

const ArrowIcon: React.FC<ArrowIconProps> = ({
    direction = 'down',
    size = 24,
    className = '',
    ...restProps
}) => {
    // Сопоставление направления с классами поворота TailwindCSS
    const rotationClasses: Record<
        NonNullable<ArrowIconProps['direction']>,
        string
    > = {
        left: 'rotate-90',
        up: 'rotate-180',
        right: '-rotate-90',
        down: 'rotate-0',
    }

    const rotationClass = rotationClasses[direction]

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={`transform ${rotationClass} ${className}`.trim()}
            {...restProps}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 21C11.7348 21 11.4804 20.8946 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.5196 20.8946 12.2652 21 12 21Z"
                fill="currentColor"
            />
        </svg>
    )
}

export default ArrowIcon

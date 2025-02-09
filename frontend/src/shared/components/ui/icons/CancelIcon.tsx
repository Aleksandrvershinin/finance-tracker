import clsx from 'clsx'

interface Props extends React.SVGProps<SVGSVGElement> {
    strokeWidth?: '1' | '2'
    transition?: boolean
}

function CancelIcon({ transition = true, strokeWidth = '2', ...rest }: Props) {
    const { className, ...otherRest } = rest
    const classNames = clsx(
        transition &&
            'lg:opacity-50 lg:hover:opacity-100 lg:transition-opacity',
        className,
    )
    return (
        <svg
            className={classNames}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            fill="none"
            {...otherRest}
        >
            <path
                d="M2 2L12 12M12 2L2 12"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
        </svg>
    )
}

export default CancelIcon

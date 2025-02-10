import clsx from 'clsx'

interface Props<T> extends React.TableHTMLAttributes<HTMLTableElement> {
    data: T[]
    headers: React.ReactNode[]
    renderRow: (item: T, index: number) => React.ReactNode[]
    headerRowProps?: React.HTMLAttributes<HTMLTableRowElement>
    bodyRowProps?: React.HTMLAttributes<HTMLTableRowElement>
}

function MyTable<T>(props: Props<T>) {
    const {
        headers,
        renderRow,
        data,
        className,
        headerRowProps,
        bodyRowProps,
        ...rest
    } = props

    return (
        <table
            className={clsx(
                'table-auto w-full border-separate border-spacing-0 border border-gray-300 rounded-lg overflow-hidden',
                className,
            )}
            {...rest}
        >
            <thead>
                <tr
                    className={clsx(
                        'bg-gray-200 border-b border-gray-300',
                        headerRowProps?.className,
                    )}
                    {...headerRowProps}
                >
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            className="px-4 py-2 border-r border-gray-300 text-left last:border-r-0"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, rowIndex) => (
                    <tr
                        key={rowIndex}
                        className={clsx(
                            'border-b border-gray-300 last:border-b-0',
                            rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100', // Чередование цветов
                            bodyRowProps?.className,
                        )}
                        {...bodyRowProps}
                    >
                        {renderRow(item, rowIndex).map((cell, cellIndex) => (
                            <td
                                key={cellIndex}
                                className={clsx(
                                    'px-4 py-2 border-r border-t border-gray-300 last:border-r-0',
                                    rowIndex === data.length - 1 &&
                                        'first:rounded-bl-lg last:rounded-br-lg',
                                )}
                            >
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default MyTable

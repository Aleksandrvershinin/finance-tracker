import { flexRender, Table } from '@tanstack/react-table'
import clsx from 'clsx'

interface Props<T> extends React.TableHTMLAttributes<HTMLTableElement> {
    table: Table<T>
    headerRowProps?: React.HTMLAttributes<HTMLTableRowElement>
    bodyRowProps?: React.HTMLAttributes<HTMLTableRowElement>
}

function TransactionsTableUI<T>({
    table,
    className,
    headerRowProps,
    bodyRowProps,
    ...rest
}: Props<T>) {
    const rows = table.getRowModel().rows

    return (
        <table
            className={clsx(
                'table-auto w-full border-separate border-spacing-0 border border-gray-300 rounded-lg overflow-hidden',
                className,
            )}
            {...rest}
        >
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                        key={headerGroup.id}
                        className={clsx(
                            'bg-gray-200 border-b border-gray-300',
                            headerRowProps?.className,
                        )}
                        {...headerRowProps}
                    >
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                className="px-4 py-2 border-r border-gray-300 text-left last:border-r-0 cursor-pointer select-none flex items-center gap-1"
                                onClick={
                                    header.column.getCanSort()
                                        ? header.column.getToggleSortingHandler()
                                        : undefined
                                }
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                )}

                                {header.column.getCanSort() && (
                                    <span className="ml-1">
                                        {header.column.getIsSorted() ===
                                            'asc' && '🔼'}
                                        {header.column.getIsSorted() ===
                                            'desc' && '🔽'}
                                        {header.column.getIsSorted() ===
                                            false && '⇅'}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr
                        key={row.id}
                        className={clsx(
                            'border-b border-gray-300 last:border-b-0',
                            rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100',
                            bodyRowProps?.className,
                        )}
                        {...bodyRowProps}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <td
                                key={cell.id}
                                className={clsx(
                                    'px-4 py-2 border-r border-t border-gray-300 last:border-r-0',
                                    rowIndex === rows.length - 1 &&
                                        'first:rounded-bl-lg last:rounded-br-lg',
                                )}
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TransactionsTableUI

import React, { useState } from 'react'
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

/* ================== TYPES ================== */

type CardId = string
type ColumnId = string

interface Column {
    id: ColumnId
    title: string
    items: CardId[]
}

type ColumnsState = Record<ColumnId, Column>

/* ================== DATA ================== */

const initialColumns: ColumnsState = {
    todo: {
        id: 'todo',
        title: 'To Do',
        items: ['Task 1', 'Task 2'],
    },
    doing: {
        id: 'doing',
        title: 'Doing',
        items: ['Task 3'],
    },
    done: {
        id: 'done',
        title: 'Done',
        items: [],
    },
}

/* ================== APP ================== */

export default function Test(): JSX.Element {
    const [columns, setColumns] = useState<ColumnsState>(initialColumns)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        }),
    )

    const onDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event
        console.log(active)

        if (!over) return

        const activeCol = active.data.current?.columnId as ColumnId | undefined
        const overCol = over.data.current?.columnId as ColumnId | undefined

        if (!activeCol || !overCol) return

        setColumns((prev) => {
            const activeItems = [...prev[activeCol].items]
            const overItems = [...prev[overCol].items]

            const activeIndex = activeItems.indexOf(active.id as CardId)

            // 🔁 Внутри одной колонки
            if (activeCol === overCol) {
                const overIndex = overItems.indexOf(over.id as CardId)

                return {
                    ...prev,
                    [activeCol]: {
                        ...prev[activeCol],
                        items: arrayMove(activeItems, activeIndex, overIndex),
                    },
                }
            }

            // 🔀 Между колонками
            activeItems.splice(activeIndex, 1)

            const overIndex = overItems.indexOf(over.id as CardId)
            const insertIndex =
                overIndex === -1 ? overItems.length : overIndex + 1

            overItems.splice(insertIndex, 0, active.id as CardId)

            return {
                ...prev,
                [activeCol]: {
                    ...prev[activeCol],
                    items: activeItems,
                },
                [overCol]: {
                    ...prev[overCol],
                    items: overItems,
                },
            }
        })
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
        >
            <div style={boardStyle}>
                {Object.values(columns).map((col) => (
                    <ColumnComponent key={col.id} column={col} />
                ))}
            </div>
        </DndContext>
    )
}

/* ================== COLUMN ================== */

interface ColumnProps {
    column: Column
}

function ColumnComponent({ column }: ColumnProps): JSX.Element {
    return (
        <div style={columnStyle}>
            <h3>{column.title}</h3>

            <SortableContext
                items={column.items}
                strategy={verticalListSortingStrategy}
            >
                {column.items.map((item) => (
                    <CardComponent key={item} id={item} columnId={column.id} />
                ))}
            </SortableContext>

            {column.items.length === 0 && (
                <div style={emptyStyle}>Перетащи сюда</div>
            )}
        </div>
    )
}

/* ================== CARD ================== */

interface CardProps {
    id: CardId
    columnId: ColumnId
}

function CardComponent({ id, columnId }: CardProps): JSX.Element {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id,
            data: { columnId },
        })

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        ...cardStyle,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {id}
        </div>
    )
}

/* ================== STYLES ================== */

const boardStyle: React.CSSProperties = {
    display: 'flex',
    gap: 16,
    padding: 16,
}

const columnStyle: React.CSSProperties = {
    width: 260,
    background: '#f1f2f4',
    padding: 12,
    borderRadius: 8,
}

const cardStyle: React.CSSProperties = {
    padding: 10,
    marginBottom: 8,
    background: '#fff',
    borderRadius: 6,
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    cursor: 'grab',
}

const emptyStyle: React.CSSProperties = {
    padding: 10,
    background: '#ddd',
    borderRadius: 6,
    color: '#555',
    textAlign: 'center',
}

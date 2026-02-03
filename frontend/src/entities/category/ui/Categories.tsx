import Button from '@/shared/components/ui/Button/Button'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import CategoryForm from './CategoryForm'
import { TCategory } from '../types/category.types'
import CategoryTable from './CategoryTable'

function Categories() {
    const [showForm, setShowForm] = useState(false)
    const [category, setCategory] = useState<TCategory | undefined>(undefined)
    const handleEditClick = (category: TCategory) => {
        setCategory(category)
        setShowForm(true)
    }
    const handleOpen = () => {
        setShowForm(true)
    }
    const handleClose = () => {
        setShowForm(false)
        setCategory(undefined)
    }
    return (
        <>
            <Button className="mb-4" onClick={handleOpen} myColor="green500">
                Добавить
            </Button>
            <CategoryTable
                handleClose={handleClose}
                handleEditClick={handleEditClick}
            />
            <AnimatePresence>
                {showForm && (
                    <Portal>
                        <ModalOpacity>
                            <div className="w-fit mx-auto mt-10">
                                <CategoryForm
                                    data={category}
                                    handleClose={handleClose}
                                />
                            </div>
                        </ModalOpacity>
                    </Portal>
                )}
            </AnimatePresence>
        </>
    )
}

export default Categories

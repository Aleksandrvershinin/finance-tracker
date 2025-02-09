import { TCategory } from '@/entities/category/types/category.types'

export function getCategoryType(type: TCategory['type']): 'Расход' | 'Доход' {
    switch (type) {
        case 'EXPENSE':
            return 'Расход'
        case 'INCOME':
            return 'Доход'
        default:
            throw new Error(`Unknown category type: ${type}`)
    }
}

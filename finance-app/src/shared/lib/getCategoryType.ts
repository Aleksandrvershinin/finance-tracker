import { TCategory } from '@/entities/category/types/category.types'

export function getCategoryType(type: TCategory['type']): 'Расход' | 'Приход' {
    switch (type) {
        case 'EXPENSE':
            return 'Расход'
        case 'INCOME':
            return 'Приход'
        default:
            throw new Error(`Unknown category type: ${type}`)
    }
}

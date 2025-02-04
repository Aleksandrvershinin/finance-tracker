import { Validate } from 'class-validator'
import { IsExistConstraint } from './is-exist.validator'

export function IsExist(tableName: string, fieldName: string) {
    return Validate(IsExistConstraint, [tableName, fieldName])
}

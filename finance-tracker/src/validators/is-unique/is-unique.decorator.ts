import { Validate } from 'class-validator'
import { IsUniqueConstraint } from './is-unique.validator'

export function IsUnique(tableName: string, fieldName: string) {
  return Validate(IsUniqueConstraint, [tableName, fieldName])
}

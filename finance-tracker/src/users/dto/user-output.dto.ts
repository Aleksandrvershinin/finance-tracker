import { Exclude } from 'class-transformer'

export class UserOutputDto {
    id: string
    username: string
    role: string

    @Exclude()
    password: string
}

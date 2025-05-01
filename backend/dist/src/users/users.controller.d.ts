import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserProfile(user: User): Promise<{
        message: string;
        user: UserDto;
    }>;
}

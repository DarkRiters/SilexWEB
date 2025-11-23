import type {User} from "./User.ts";
import type {UserDTO} from "./UserDTO.ts";
import type {UserRole} from "./UserRole.ts";

export class UserFactory {
    static fromApi(dto: UserDTO): User {
        const role = dto.role as UserRole;
        return {
            id: String(dto.id),
            name: dto.name,
            email: dto.email,
            role,
            createdAt: new Date(dto.created_at),
            updatedAt: new Date(dto.updated_at),
        };
    }
}
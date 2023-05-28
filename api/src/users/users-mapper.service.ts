import { Injectable } from '@nestjs/common';
import { ResponseUserDto } from './dto/response-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersMapper {
  toResponse(entity: User): ResponseUserDto {
    const response: ResponseUserDto = {
      id: entity.id,
      name: entity.name,
      username: entity.username,
      birthDate: entity.birthDate,
      email: entity.email,
      profilePhoto: entity.profilePhoto
    };
    return response;
  }
}

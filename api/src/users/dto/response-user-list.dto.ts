import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from './response-user.dto';

export class ResponseUserListDto {
  @ApiProperty({ type: [ResponseUserDto] })
  users: ResponseUserDto[];
  @ApiProperty()
  total: number;
}

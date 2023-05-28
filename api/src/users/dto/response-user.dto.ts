import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  birthDate: Date;
  @ApiProperty()
  email: string;
  @ApiProperty()
  profilePhoto: string;
}

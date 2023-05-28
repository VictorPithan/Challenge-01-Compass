import { ApiProperty } from '@nestjs/swagger';

export class ResponsePostDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  profilePhoto: string;
  @ApiProperty()
  postDate: Date;
  @ApiProperty()
  description: string;
  @ApiProperty()
  urlImage: string;
}

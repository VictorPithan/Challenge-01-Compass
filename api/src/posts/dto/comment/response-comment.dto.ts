import { ApiProperty } from '@nestjs/swagger';

export class ResponseCommentDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  postId: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  content: string;
}

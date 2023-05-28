import { ApiProperty } from '@nestjs/swagger';
import { ResponsePostDto } from './response-post.dto';

export class ResponsePostListDto {
  @ApiProperty({ type: [ResponsePostDto] })
  posts: ResponsePostDto[];
  @ApiProperty()
  total: number;
}

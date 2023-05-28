import { ApiProperty } from '@nestjs/swagger';
import { ResponseCommentDto } from './response-comment.dto';

export class ResponseCommentListDto {
  @ApiProperty({ type: [ResponseCommentDto] })
  comments: ResponseCommentDto[];
  @ApiProperty()
  total: number;
}

import { Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { ResponseCommentDto } from './dto/comment/response-comment.dto';

@Injectable()
export class CommentsMapper {
  toResponse(entity: Comment): ResponseCommentDto {
    const response: ResponseCommentDto = {
      id: entity.id,
      postId: entity.post.id,
      username: entity.user.username,
      content: entity.content
    };
    return response;
  }
}

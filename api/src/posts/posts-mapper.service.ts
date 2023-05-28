import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { ResponsePostDto } from './dto/post/response-post.dto';

@Injectable()
export class PostsMapper {
  toResponse(entity: Post): ResponsePostDto {
    const response: ResponsePostDto = {
      id: entity.id,
      urlImage: entity.urlImage,
      postDate: entity.postDate,
      username: entity.user.username,
      profilePhoto: entity.user.profilePhoto,
      description: entity.description
    };
    return response;
  }
}

import { join } from 'path';
import { Comment } from 'src/posts/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'social-media',
  synchronize: true,
  entities: [User, Post, Comment],
  migrations: [
    join(__dirname, '..', '..', '**', 'database/migrations/*.{ts,js}')
  ]
};
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

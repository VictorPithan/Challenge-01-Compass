import { Comment } from 'src/posts/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column({ name: 'url_image' })
  urlImage: string;

  @CreateDateColumn({
    name: 'post_date',
    type: 'datetime'
  })
  postDate: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime'
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'datetime'
  })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}

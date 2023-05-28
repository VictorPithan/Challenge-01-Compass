import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CommentsRelations1685151955183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['post_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'posts',
        onDelete: 'CASCADE',
        name: 'FK_comments_post_id_posts'
      })
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        name: 'FK_comments_user_id_users'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('comments', 'FK_comments_post_id_posts');
    await queryRunner.dropForeignKey('comments', 'FK_comments_user_id_users');
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateContacts1607714056788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'contacts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'company_id',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'int',
          },
          {
            name: 'zip_code',
            type: 'int',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'neighborhood',
            type: 'varchar',
          },

          {
            name: 'number',
            type: 'varchar',
          },

          {
            name: 'complement',
            type: 'varchar',
          },

          {
            name: 'state',
            type: 'varchar',
          },

          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

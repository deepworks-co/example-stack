import { MigrationInterface, QueryRunner } from "typeorm"

export class Job1589745321146 implements MigrationInterface {
  name = "Job1589745321146"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "jobName" character varying NOT NULL, "authorId" uuid, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_f3e6789f2c84e5fdd2305096cf4" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_f3e6789f2c84e5fdd2305096cf4"`,
      undefined,
    )
    await queryRunner.query(`DROP TABLE "job"`, undefined)
  }
}

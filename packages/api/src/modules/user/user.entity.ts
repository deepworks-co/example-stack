import { Entity, BeforeInsert, OneToMany } from "typeorm"
import { Field, ObjectType } from "type-graphql"
import bcrypt from "bcryptjs"

import { BaseEntity } from "../shared/base.entity"
import { StringField } from "../shared/fields"
import { Job } from "../job/job.entity"

@ObjectType()
@Entity()
export class User extends BaseEntity<User> {
  @StringField({ unique: true })
  email: string

  @StringField({ graphql: false })
  password: string

  @StringField()
  firstName: string

  @StringField()
  lastName: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  @Field(type => [Job])
  @OneToMany(
    type => Job,
    job => job.author,
    { lazy: true, cascade: ["update"] },
  )
  jobs: Job[]
}

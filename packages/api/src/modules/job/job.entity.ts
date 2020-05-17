import { Entity, Column, ManyToOne, JoinColumn } from "typeorm"
import { ObjectType, Field } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { User } from "../user/user.entity"
import { RelationColumn } from "../shared/fields/relationshipColumn"

@ObjectType()
@Entity()
export class Job extends BaseEntity<Job> {
  @Field()
  @Column()
  jobName: string

  @ManyToOne(type => User)
  @JoinColumn({ name: "authorId" })
  author: User
  @RelationColumn()
  authorId: string
}

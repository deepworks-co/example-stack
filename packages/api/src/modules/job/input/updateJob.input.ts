import { InputType, Field } from "type-graphql"

import { Job } from "../job.entity"

@InputType()
export class UpdateJobInput implements Partial<Job> {
  @Field()
  jobName: string
}

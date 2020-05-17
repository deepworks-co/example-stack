import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Authorized,
  FieldResolver,
  Root,
} from "type-graphql"

import { Job } from "./job.entity"
import { CreateJobInput } from "./input/createJob.input"
import { UpdateJobInput } from "./input/updateJob.input"
import { JobService } from "./job.service"
import { JobRepository } from "./job.repository"
import { CurrentUser } from "../shared/context/currentUser"
import { User } from "../user/user.entity"
import { UserRepository } from "../user/user.repository"
import { UserInputError } from "apollo-server-express"

@Resolver(() => Job)
export class JobResolver {
  constructor(
    private readonly jobService: JobService,
    private readonly jobRepository: JobRepository,
    private readonly userRepository: UserRepository,
  ) {}

  @Query(() => [Job])
  getJobs(): Promise<Job[]> {
    return this.jobRepository.findAll()
  }

  @Authorized()
  @Mutation(() => Job)
  createJob(
    @CurrentUser() currentUser: User,
    @Arg("data") data: CreateJobInput,
  ): Promise<Job> {
    return this.jobService.create(currentUser, data)
  }

  @Authorized()
  @Mutation(() => Job)
  updateJob(
    @Arg("jobId") jobId: string,
    @Arg("data") data: UpdateJobInput,
  ): Promise<Job> {
    return this.jobService.update(jobId, data)
  }

  @Authorized()
  @Mutation(() => Boolean)
  destroyJob(@Arg("jobId") jobId: string): Promise<boolean> {
    return this.jobService.destroy(jobId)
  }

  @Authorized()
  @FieldResolver(type => User)
  async author(@Root() job: Job): Promise<User> {
    const user = await this.userRepository.findById(job.authorId, {
      cache: 1000,
    })
    if (!user) throw new UserInputError("Cannot find authorId " + job.authorId)
    return user
  }
}

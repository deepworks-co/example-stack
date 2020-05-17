import { Service } from "typedi"

import { Job } from "./job.entity"
import { CreateJobInput } from "./input/createJob.input"
import { UpdateJobInput } from "./input/updateJob.input"
import { JobRepository } from "./job.repository"
import { User } from "../user/user.entity"

@Service()
export class JobService {
  constructor(private readonly jobRepository: JobRepository) {}

  async create(author: User, data: CreateJobInput): Promise<Job> {
    const job = await Job.create(data)
    job.author = author
    return job.save()
  }

  async update(jobId: string, data: UpdateJobInput): Promise<Job> {
    const job = await this.jobRepository.findById(jobId)
    Object.assign(job, data)
    return job.save()
  }

  async destroy(jobId: string): Promise<boolean> {
    const job = await this.jobRepository.findById(jobId)
    await job.remove()
    return true
  }
}

import { Service } from "typedi"
import { Job } from "./job.entity"

@Service()
export class JobRepository {
  findById(jobId: string): Promise<Job> {
    return Job.findOneOrFail(jobId)
  }

  findAll(): Promise<Job[]> {
    return Job.find()
  }
}

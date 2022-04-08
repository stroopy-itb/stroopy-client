import { CreateTestResultDto } from "../../adapter/dto";
import { ITestResultRepository } from "../../adapter/repository/interface";
import { TestResult } from "../model";
import { ITestResultService } from "./interface";

export default class TestResultService implements ITestResultService {
  constructor(
    private readonly testResultRepository: ITestResultRepository
  ) { }

  getAll(size: number, page: number, filter?: Partial<TestResult>): Promise<TestResult[]> {
    return this.testResultRepository.getAll(size, page, filter);
  }
  getOne(filter?: Partial<TestResult>): Promise<TestResult> {
    return this.testResultRepository.getOne(filter);
  }
  getOneById(id: string): Promise<TestResult> {
    return this.testResultRepository.getOneById(id);
  }
  create(createTestResultDto: CreateTestResultDto): Promise<TestResult> {
    return this.testResultRepository.create(createTestResultDto);
  }
  delete(id: string): Promise<void> {
    return this.testResultRepository.delete(id);
  }
}

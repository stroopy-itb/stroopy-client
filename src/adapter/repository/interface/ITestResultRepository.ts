import { TestResult } from "../../../domain/model";
import { CreateTestResultDto, GetAnalyticsResponseDto, ListTestResultResponseDto } from "../../dto";

export default interface ITestResultRepository {
  getAll(size: number, page: number, filter?: Partial<TestResult>): Promise<ListTestResultResponseDto>;
  getAnalytics(researchId: string): Promise<GetAnalyticsResponseDto>;
  getOne(filter?: Partial<TestResult>): Promise<TestResult>;
  getOneById(id: string): Promise<TestResult>;
  create(createTestResultDto: CreateTestResultDto): Promise<TestResult>;
  delete(id: string): Promise<void>;
}
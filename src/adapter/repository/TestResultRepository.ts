import { TestResult } from "../../domain/model";
import { CreateTestResultDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { queryMaker } from "../utils/queryMaker";
import { ITestResultRepository } from "./interface";

export default class TestResultRepository implements ITestResultRepository {
  constructor(
    private readonly http: HttpClient
  ) { }

  getAll(size: number, page: number, filter?: Partial<TestResult>): Promise<TestResult[]> {
    const query = queryMaker<TestResult>(filter, true);

    return this.http.get(`test-result/list?size=${size}&page=${page}${query}`);
  }
  getOne(filter?: Partial<TestResult>): Promise<TestResult> {
    const query = queryMaker<TestResult>(filter);

    return this.http.get(`test-result${query}`);
  }
  getOneById(id: string): Promise<TestResult> {
    return this.http.get(`test-result/${id}`);
  }
  create(createTestResultDto: CreateTestResultDto): Promise<TestResult> {
    return this.http.post(`test-result/create`, createTestResultDto);
  }
  delete(id: string): Promise<void> {
    return this.http.delete(`test-result/delete/${id}`);
  }
}
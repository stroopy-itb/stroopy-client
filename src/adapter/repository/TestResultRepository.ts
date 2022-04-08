import { TestResult } from "../../domain/model";
import { CreateTestResultDto, ListTestResultResponseDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { queryMaker } from "../utils/queryMaker";
import { ITestResultRepository } from "./interface";

export default class TestResultRepository implements ITestResultRepository {
  constructor(
    private readonly http: HttpClient
  ) { }

  public async getAll(size: number, page: number, filter?: Partial<TestResult>): Promise<ListTestResultResponseDto> {
    const query = queryMaker<TestResult>(filter, true);

    return this.http.get(`test-result/list?size=${size}&page=${page}${query}`);
  }
  public async getOne(filter?: Partial<TestResult>): Promise<TestResult> {
    const query = queryMaker<TestResult>(filter);

    return this.http.get(`test-result${query}`);
  }
  public async getOneById(id: string): Promise<TestResult> {
    return this.http.get(`test-result/${id}`);
  }
  public async create(createTestResultDto: CreateTestResultDto): Promise<TestResult> {
    return this.http.post(`test-result/create`, createTestResultDto);
  }
  public async delete(id: string): Promise<void> {
    return this.http.delete(`test-result/delete/${id}`);
  }
}
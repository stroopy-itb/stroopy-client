import { CreateResearchDto, UpdateResearchDto } from "../../adapter/dto";
import { IResearchRepository } from "../../adapter/repository/interface";
import { Research } from "../model";
import { IResearchService } from "./interface";

export default class ResearchService implements IResearchService {
  constructor(
    private readonly researchRepository: IResearchRepository
  ) { }

  getAll(size: number, page: number, filter?: Partial<Research> & { full?: boolean | undefined; }): Promise<Research[]> {
    return this.researchRepository.getAll(size, page, filter);
  }
  getOne(filter?: Partial<Research> & { full?: boolean | undefined; }): Promise<Research> {
    return this.researchRepository.getOne(filter);
  }
  getOneById(id: string): Promise<Research> {
    return this.researchRepository.getOneById(id);
  }
  create(createResearchDto: CreateResearchDto): Promise<Research> {
    return this.researchRepository.create(createResearchDto);
  }
  update(updateResearchDto: UpdateResearchDto): Promise<Research> {
    return this.researchRepository.update(updateResearchDto);
  }
  delete(id: string): Promise<void> {
    return this.researchRepository.delete(id);
  }
}

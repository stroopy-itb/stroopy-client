import { Research } from "../../../domain/model";
import { CreateResearchDto, ListResearchResponseDto, UpdateResearchDto } from "../../dto";

export default interface IResearchRepository {
  getAll(size: number, page: number, filter?: Partial<Research> & { full?: boolean }): Promise<ListResearchResponseDto>;
  getOne(filter?: Partial<Research> & { full?: boolean }): Promise<Research>;
  getOneById(id: string): Promise<Research>;
  create(createResearchDto: CreateResearchDto): Promise<Research>;
  update(updateResearchDto: UpdateResearchDto): Promise<Research>;
  delete(id: string): Promise<void>;
}
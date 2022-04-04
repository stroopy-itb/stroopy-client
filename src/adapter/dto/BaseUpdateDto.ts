import { BaseModel } from "../../domain/model";

export abstract class BaseUpdateDto implements BaseModel {
  public id: string;

  public createdAt: Date | string;

  public updatedAt: Date | string;
}
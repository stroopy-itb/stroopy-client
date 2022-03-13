import { BaseModel } from "../../domain/model";

export abstract class BaseUpdateDto implements BaseModel {
  public readonly id: string;

  public readonly createdAt: Date | string;

  public readonly updatedAt: Date | string;
}
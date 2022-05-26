import { 
  ActivityBurden, 
  BodyCondition, 
  RoomCondition, 
  RoomLighting, 
  RoomNoise, 
  RoomTemperature, 
  RoomVibration
} from "../../domain/model";

export default class CreateTestResultDto {
  public bodyCondition: BodyCondition;
  public roomCondition: RoomCondition;
  public roomTemperature: number;
  public roomTemperaturePerception: RoomTemperature;
  public roomLighting: RoomLighting;
  public roomNoise: RoomNoise;
  public roomVibration: RoomVibration;
  public preActivity: string;
  public preActivityPhysicalBurden: ActivityBurden;
  public preActivityMentalBurden: ActivityBurden;
  public postActivity: string;
  public postActivityPhysicalBurden: ActivityBurden;
  public postActivityMentalBurden: ActivityBurden;
  public testNo: number;
  public correct: number;
  public wrong: number;
  public unanswered: number;
  public rtca: number;
  public respondentId: string;
  public researchId: string;
}

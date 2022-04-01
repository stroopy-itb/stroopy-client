import { ActivityBurden, BodyCondition, RoomCondition } from "../../domain/model";

export const translateBodyCondition = (cond: BodyCondition): string => {
  switch (cond) {
    case BodyCondition.Healthy:
      return "sehat";
    case BodyCondition.NotHealthy:
      return "tidak sehat";
  }
}

export const translateRoomCondition = (room: RoomCondition): string => {
  switch (room) {
    case RoomCondition.Indoor:
      return "dalam ruangan";
    case RoomCondition.Outdoor:
      return "luar ruangan";
  }
}

export const translateActivityBurden = (burden: ActivityBurden): string => {
  switch (burden) {
    case ActivityBurden.Heavy:
      return "berat";
    case ActivityBurden.Medium:
      return "sedang";
    case ActivityBurden.Light:
      return "ringan";
  }
}
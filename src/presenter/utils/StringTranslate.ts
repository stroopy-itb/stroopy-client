import { ActivityBurden, BodyCondition, InstitutionType, RoomCondition } from "../../domain/model";

export const translateBodyCondition = (cond: BodyCondition): string => {
  switch (cond) {
    case BodyCondition.Healthy:
      return "Sehat";
    case BodyCondition.NotHealthy:
      return "Tidak sehat";
  }
}

export const translateRoomCondition = (room: RoomCondition): string => {
  switch (room) {
    case RoomCondition.Indoor:
      return "Dalam ruangan";
    case RoomCondition.Outdoor:
      return "Luar ruangan";
  }
}

export const translateActivityBurden = (burden: ActivityBurden): string => {
  switch (burden) {
    case ActivityBurden.Heavy:
      return "Berat";
    case ActivityBurden.Medium:
      return "Sedang";
    case ActivityBurden.Light:
      return "Ringan";
  }
}

export const translateInstitutionType = (type: InstitutionType): string => {
  switch (type) {
    case InstitutionType.GENERAL:
      return "Umum";
    case InstitutionType.UNIVERSITY:
      return "Universitas";
  }
}

import React from "react";
import { TestResult } from "../../domain/model";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import {
  translateActivityBurden,
  translateBodyCondition,
  translateRoomCondition,
  translateRoomTemperature,
} from "../utils";

export default function ExportSpreadsheet(props: {
  data?: TestResult[];
  filename?: string;
}) {
  const { data, filename } = props;

  const exportFilename = filename ? filename : "stroopy_hasil_tes";
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const flattenData = (input: TestResult[]) => {
    const flatData: any = input.map((entry) => {
      return {
        id: entry.id,
        penelitian: entry.research?.groupToken,
        responden: entry.respondent?.username,
        tes_ke: entry.testNo,
        waktu_tes: entry.createdAt,
        kondisi_ruangan: translateRoomCondition(entry.roomCondition),
        suhu_ruangan: translateRoomTemperature(entry.roomTemperature),
        perangkat: entry.device,
        kondisi_tubuh: translateBodyCondition(entry.bodyCondition),
        aktivitas_sebelum: entry.preActivity,
        beban_fisik_aktivitas_sebelum: translateActivityBurden(
          entry.preActivityPhysicalBurden
        ),
        beban_mental_aktivitas_sebelum: translateActivityBurden(
          entry.preActivityMentalBurden
        ),
        aktivitas_sesudah: entry.postActivity,
        beban_fisik_aktivitas_sesudah: translateActivityBurden(
          entry.postActivityPhysicalBurden
        ),
        beban_mental_aktivitas_sesudah: translateActivityBurden(
          entry.postActivityMentalBurden
        ),
        benar: entry.correct,
        salah: entry.wrong,
        rtca: entry.rtca,
      };
    });
    return flatData;
  };
  const exportSpreadSheet = () => {
    if (data) {
      const ws = XLSX.utils.json_to_sheet(flattenData(data));
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const fileData = new Blob([excelBuffer], { type: fileType });

      const dateNow = new Date();
      const leadingZero = (n: number) => {
        return n < 10 ? `0${n}` : n;
      };
      const dateString = `${dateNow.getFullYear()}_${leadingZero(
        dateNow.getMonth() + 1
      )}_${leadingZero(dateNow.getDate())}`;
      FileSaver.saveAs(
        fileData,
        `${exportFilename}-${dateString}${fileExtension}`
      );
    }
  };

  return (
    <button className="button button-action" onClick={exportSpreadSheet}>
      Unduh Spreadsheet
    </button>
  );
}

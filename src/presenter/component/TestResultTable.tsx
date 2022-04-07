import React from "react";
import { TestResult } from "../../domain/model";
import {
  translateActivityBurden,
  translateBodyCondition,
  translateRoomCondition,
} from "../utils";
import ExportSpreadsheet from "./ExportSpreadsheet";

export default function TestResultTable(props: {
  testResults?: TestResult[];
}): JSX.Element {
  const { testResults } = props;

  return (
    <div className="justify-self-stretch overflow-hidden">
    <div className="bg-white rounded-2xl overflow-auto md:p-5">
        {testResults ? (
        <table className="table-auto w-full">
            <thead>
              <tr className="font-bold">
                <td className="py-2 px-5 border-b-2 border-black">NO.</td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Penelitian
                </td>
                <td className="py-2 px-5 border-b-2 border-black">Responden</td>
                <td className="py-2 px-5 border-b-2 border-black">Tes Ke</td>
                <td className="py-2 px-5 border-b-2 border-black">Waktu Tes</td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Tempat Tes
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Kondisi Tubuh
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Suhu Tubuh
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Aktivitas Sebelum
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Beban Fisik
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Beban Mental
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Aktivitas Sesudah
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Beban Fisik
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Beban Mental
                </td>
                <td className="py-2 px-5 border-b-2 border-black">Benar</td>
                <td className="py-2 px-5 border-b-2 border-black">Salah</td>
                <td className="py-2 px-5 border-b-2 border-black">RTCA</td>
              </tr>
            </thead>
            <tbody>
              {testResults.map((row, index) => {
                return (
                  <tr key={index}>
                    <td className="py-2 px-5">{index + 1}</td>
                    <td className="py-2 px-5">{row.research?.groupToken}</td>
                    <td className="py-2 px-5">{row.respondent?.username}</td>
                    <td className="py-2 px-5">{row.testNo}</td>
                    <td className="py-2 px-5">
                      {new Date(row.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-5">
                      {translateRoomCondition(row.roomCondition)}
                    </td>
                    <td className="py-2 px-5">
                      {translateBodyCondition(row.bodyCondition)}
                    </td>
                    <td className="py-2 px-5">{row.bodyTemp}</td>
                    <td className="py-2 px-5">{row.preActivity}</td>
                    <td className="py-2 px-5">
                      {translateActivityBurden(row.preActivityPhysicalBurden)}
                    </td>
                    <td className="py-2 px-5">
                      {translateActivityBurden(row.preActivityMentalBurden)}
                    </td>
                    <td className="py-2 px-5">{row.postActivity}</td>
                    <td className="py-2 px-5">
                      {translateActivityBurden(row.postActivityPhysicalBurden)}
                    </td>
                    <td className="py-2 px-5">
                      {translateActivityBurden(row.postActivityMentalBurden)}
                    </td>
                    <td className="py-2 px-5">{row.correct}</td>
                    <td className="py-2 px-5">{row.wrong}</td>
                    <td className="py-2 px-5">{row.rtca}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
      <div className="justify-self-stretch flex justify-between mt-5">
        {testResults && testResults.length > 0 ? (
          <ExportSpreadsheet data={testResults} />
        ) : (
          ""
        )}
        {/* <div className="rounded-2xl bg-white flex">
          <button className="py-2 px-4 text-gray-400">Prev</button>
          <button className="py-2 px-4 bg-blue text-white">1</button>
          <button className="py-2 px-4 text-blue">2</button>
          <button className="py-2 px-4 text-blue">3</button>
          <button className="py-2 px-4 text-blue">4</button>
          <button className="py-2 px-4 text-blue">Next</button>
        </div> */}
      </div>
    </div>
  );
}

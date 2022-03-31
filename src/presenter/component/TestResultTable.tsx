
import React from "react";
import { TestResult } from "../../domain/model";

export default function TestResultTable(props: {
  testResults?: TestResult[];
}): JSX.Element {
  const { testResults } = props;

  return (
    <div className="justify-self-stretch bg-white rounded-2xl overflow-auto md:p-5">
      {testResults ? (
        <table className="table-auto w-full">
          <thead>
            <tr className="font-bold">
              <td className="py-2 px-5 border-b-2 border-black">NO.</td>
              <td className="py-2 px-5 border-b-2 border-black">Penelitian</td>
              <td className="py-2 px-5 border-b-2 border-black">Responden</td>
              <td className="py-2 px-5 border-b-2 border-black">Tes Ke</td>
              <td className="py-2 px-5 border-b-2 border-black">Waktu Tes</td>
              <td className="py-2 px-5 border-b-2 border-black">Tempat Tes</td>
              <td className="py-2 px-5 border-b-2 border-black">Kondisi Tubuh</td>
              <td className="py-2 px-5 border-b-2 border-black">Suhu Tubuh</td>
              <td className="py-2 px-5 border-b-2 border-black">Aktivitas Sebelum</td>
              <td className="py-2 px-5 border-b-2 border-black">Beban Fisik</td>
              <td className="py-2 px-5 border-b-2 border-black">Beban Mental</td>
              <td className="py-2 px-5 border-b-2 border-black">Aktivitas Sesudah</td>
              <td className="py-2 px-5 border-b-2 border-black">Beban Fisik</td>
              <td className="py-2 px-5 border-b-2 border-black">Beban Mental</td>
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
                  <td className="py-2 px-5">{row.roomCondition}</td>
                  <td className="py-2 px-5">{row.bodyCondition}</td>
                  <td className="py-2 px-5">{row.bodyTemp}</td>
                  <td className="py-2 px-5">{row.preActivity}</td>
                  <td className="py-2 px-5">{row.preActivityPhysicalBurden}</td>
                  <td className="py-2 px-5">{row.preActivityMentalBurden}</td>
                  <td className="py-2 px-5">{row.postActivity}</td>
                  <td className="py-2 px-5">{row.postActivityPhysicalBurden}</td>
                  <td className="py-2 px-5">{row.postActivityMentalBurden}</td>
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
  );
}

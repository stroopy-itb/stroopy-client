import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function Result(): JSX.Element {
  const result = useSelector((state: RootState) => state.exam.result);

  return (
    <div className="flex-grow grid grid-flow-row gap-20 justify-items-center content-center">
      <h1 className="text-5xl text-white font-bold">Hasil</h1>
      <div className="text-white text-center grid grid-flow-row gap-2">
        <div className="grid grid-cols-3">
          <div>
            <h2 className="text-3xl font-bold">Benar</h2>
            <h4 className="text-xl">{result.corrects}</h4>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Salah</h2>
            <h4 className="text-xl">{result.wrongs}</h4>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Tidak Terjawab</h2>
            <h4 className="text-xl">{result.unanswered}</h4>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold">RTCA</h2>
          <h3 className="text-lg font-bold">(Right Time for Correct Answer)</h3>
          <h4 className="text-xl">{result.rtca.toPrecision(3)}</h4>
        </div>
      </div>
    </div>
  );
}

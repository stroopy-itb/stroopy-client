import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TestResultTable } from "../../component";
import { testResultMiddleware } from "../../redux/middleware";
import { AppDispatch, RootState } from "../../redux/store";

export default function History(): JSX.Element {
  const testResults = useSelector(
    (state: RootState) => state.testResult.testResults
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!testResults) {
      dispatch(testResultMiddleware.getAll({ size: -1, page: 1, filter: {} }));
    }
  }, [testResults, dispatch]);

  return (
    <div className="flex-grow grid grid-flow-row gap-5 justify-items-center content-start">
      <h1 className="text-4xl font-bold text-white">Riwayat Hasil Tes</h1>
      <TestResultTable testResults={testResults} />
    </div>
  );
}

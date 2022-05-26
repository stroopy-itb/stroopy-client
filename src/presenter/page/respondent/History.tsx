import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading, TestResultTable } from "../../component";
import { testResultMiddleware } from "../../redux/middleware";
import { AppDispatch, RootState } from "../../redux/store";

export default function History(): JSX.Element {
  const testResults = useSelector(
    (state: RootState) => state.testResult.testResults
  );
  const sizeState = useSelector((state: RootState) => state.testResult.size);
  const pageState = useSelector((state: RootState) => state.testResult.page);
  const totalSize = useSelector(
    (state: RootState) => state.testResult.totalSize
  );

  const [size] = useState(sizeState);
  const [page, setPage] = useState(pageState);

  const changePage = (event: any) => {
    setPage(event.selected + 1);
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      testResultMiddleware.getAll({ size: size, page: page, filter: {} })
    );
  }, [size, page, dispatch]);
  return (
    <div className="flex-grow grid grid-flow-row gap-5 justify-items-center content-start">
      <h1 className="text-4xl font-bold text-gray-100">Riwayat Hasil Tes</h1>
      {totalSize ? (
        <TestResultTable
          testResults={testResults}
          size={size}
          page={page}
          totalSize={totalSize}
          changePage={changePage}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ResearchHeader, TestResultTable } from "../../component";
import { testResultMiddleware } from "../../redux/middleware";
import researchMiddleware from "../../redux/middleware/ResearchMiddleware";
import { AppDispatch, RootState } from "../../redux/store";

export default function AdminResearchDetail(): JSX.Element {
  const { id } = useParams();

  const research = useSelector(
    (state: RootState) => state.research.selectedResearch
  );
  const researchToken = useSelector(
    (state: RootState) => state.researchToken.selectedResearchToken
  );
  const user = useSelector((state: RootState) => state.user.user);
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
    console.log(page);
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (id && research?.id !== id) {
      dispatch(researchMiddleware.getOneById({ id }));
    }
  }, [id, research, dispatch]);
  useEffect(() => {
    dispatch(
      testResultMiddleware.getAll({
        size: size,
        page: page,
        filter: { researchId: id },
      })
    );
  }, [id, size, page, dispatch]);

  const tokenExpired = useCallback(() => {
    if (research?.researchToken) {
      return Date.now() > new Date(research.researchToken.expiredAt).valueOf();
    }
    return true;
  }, [research]);

  return (
    <div className="flex-grow p-10 grid grid-flow-row gap-10 justify-items-center content-start">
      <ResearchHeader
        research={research}
        researchToken={researchToken}
        user={user}
        tokenExpired={tokenExpired()}
      />
      <h1 className="text-4xl font-bold text-white">Hasil Tes</h1>
      {totalSize ? (
        <TestResultTable
          testResults={testResults}
          size={size}
          page={page}
          totalSize={totalSize}
          changePage={changePage}
        />
      ) : (
        ""
      )}
    </div>
  );
}

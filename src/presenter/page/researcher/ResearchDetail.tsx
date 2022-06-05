import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ExportSpreadsheet,
  Loading,
  Paginate,
  ResearchHeader,
  TestResultAnalytics,
  TestResultTable,
} from "../../component";
import { testResultMiddleware } from "../../redux/middleware";
import researchMiddleware from "../../redux/middleware/ResearchMiddleware";
import { AppDispatch, RootState } from "../../redux/store";

export default function ResearchDetail(): JSX.Element {
  const { id } = useParams();

  const research = useSelector(
    (state: RootState) => state.research.selectedResearch
  );
  const researchToken = useSelector(
    (state: RootState) => state.researchToken.selectedResearchToken
  );
  const user = useSelector((state: RootState) => state.user.user);
  const analytics = useSelector(
    (state: RootState) => state.testResult.analytics
  );
  const respondentResults = useSelector(
    (state: RootState) => state.testResult.respondentResults
  );
  const testResults = useSelector(
    (state: RootState) => state.testResult.testResults
  );
  const sizeState = useSelector((state: RootState) => state.testResult.size);
  const pageState = useSelector((state: RootState) => state.testResult.page);
  const totalSize = useSelector(
    (state: RootState) => state.testResult.totalSize
  );
  const researchLoading = useSelector(
    (state: RootState) => state.research.loading
  );
  const testResultLoading = useSelector(
    (state: RootState) => state.testResult.loading
  );

  const [size, setSize] = useState(10);
  const [page, setPage] = useState(pageState);
  const [pageCount, setPageCount] = useState(Math.ceil(totalSize / size));

  const changePage = (event: any) => {
    setPage(Number(event.selected + 1));
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (id) {
      dispatch(researchMiddleware.getOneById({ id }));
    }
  }, [id, dispatch]);
  useEffect(() => {
    dispatch(
      testResultMiddleware.getAll({
        size: size,
        page: page,
        filter: { researchId: id },
      })
    );
    dispatch(testResultMiddleware.getAnalytics({ researchId: id || "" }));
  }, [id, size, page, dispatch]);
  useEffect(() => {
    setPageCount(Math.ceil(totalSize / size));
  }, [totalSize, size]);

  const updateRespondentResults = useCallback(
    (respondentId: string) => {
      if (respondentId !== "") {
        dispatch(
          testResultMiddleware.getRespondentResults({
            respondentId,
            researchId: id,
          })
        );
      }
    },
    [id, dispatch]
  );

  const tokenExpired = useCallback(() => {
    if (research?.researchToken) {
      return Date.now() > new Date(research.researchToken.expiredAt).valueOf();
    }
    return true;
  }, [research]);

  return !researchLoading && research?.id === id ? (
    <div className="flex-grow p-4 lg:p-6 grid grid-flow-row gap-4 lg:gap-5 lg:justify-items-center content-start">
      <ResearchHeader
        research={research}
        researchToken={researchToken}
        user={user}
        tokenExpired={tokenExpired()}
        editable={testResults !== undefined && testResults.length === 0}
      />
      <h1 className="text-center text-3xl font-bold text-gray-100">
        Hasil Tes
      </h1>
      {analytics ? (
        <TestResultAnalytics
          analytics={analytics}
          respondentTestResults={respondentResults}
          researchTickets={research?.researchTickets}
          onRespondentIdChange={updateRespondentResults}
        />
      ) : (
        ""
      )}
      {analytics?.recordCount !== 0 ? (
        <div className="w-full flex justify-between">
          <ExportSpreadsheet research={research} />
          {pageCount > 1 ? (
            <Paginate
              size={size}
              page={page}
              totalSize={totalSize}
              changePage={changePage}
              pageCount={pageCount}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      {!testResultLoading && totalSize ? (
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
  ) : (
    <Loading context="Penelitian" />
  );
}

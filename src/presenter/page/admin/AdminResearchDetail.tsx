import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Loading,
  ResearchHeader,
  TestResultAnalytics,
  TestResultTable,
} from "../../component";
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
        size: 0,
        page: page,
        filter: { researchId: id },
      })
    );
    dispatch(testResultMiddleware.getAnalytics({ researchId: id || "" }));
  }, [id, size, page, dispatch]);

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

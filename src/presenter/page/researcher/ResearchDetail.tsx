import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ResearchHeader, TestResultTable } from "../../component";
import { testResultMiddleware } from "../../redux/middleware";
import researchMiddleware from "../../redux/middleware/ResearchMiddleware";
import { AppDispatch, RootState } from "../../redux/store";

export default function ResearchDetail(): JSX.Element {
  const research = useSelector(
    (state: RootState) => state.research.selectedResearch
  );
  const user = useSelector((state: RootState) => state.user.user);
  const testResults = useSelector(
    (state: RootState) => state.testResult.testResults
  );

  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (id && research?.id !== id) {
      dispatch(researchMiddleware.getOneById({ id }));
      dispatch(
        testResultMiddleware.getAll({
          size: -1,
          page: 1,
          filter: { researchId: id },
        })
      );
    }
  }, [id, research, testResults, dispatch]);

  const tokenExpired = useCallback(() => {
    if (research?.researchToken) {
      return Date.now() > new Date(research.researchToken.expiredAt).valueOf();
    }
    return true;
  }, [research]);

  return (
    <div className="flex-grow p-10 grid grid-flow-row gap-5 justify-items-center content-start">
      <ResearchHeader
        research={research}
        user={user}
        tokenExpired={tokenExpired()}
      />
      <h1 className="text-4xl font-bold text-white">Hasil Tes</h1>
      <TestResultTable testResults={testResults} />
    </div>
  );
}

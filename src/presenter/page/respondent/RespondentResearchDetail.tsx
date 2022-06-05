import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Loading, ResearchHeader } from "../../component";
import researchMiddleware from "../../redux/middleware/ResearchMiddleware";
import { AppDispatch, RootState } from "../../redux/store";

export default function RespodentResearchDetail(): JSX.Element {
  const research = useSelector(
    (state: RootState) => state.research.selectedResearch
  );
  const researchToken = useSelector(
    (state: RootState) => state.researchToken.selectedResearchToken
  );
  const user = useSelector((state: RootState) => state.user.user);

  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (id && research?.id !== id) {
      dispatch(researchMiddleware.getOneById({ id }));
    }
  }, [id, research, dispatch]);

  const navigate = useNavigate();

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
        editable={false}
      />
      {research?.researchSetup && !tokenExpired() ? (
        <button
          className="w-64 button button-xl button-neutral-outline"
          onClick={() => navigate(`/setup/${id}`)}
        >
          Mulai Tes!
        </button>
      ) : (
        <Loading context="Penelitian" />
      )}
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ResearchHeader } from "../../component";
import researchMiddleware from "../../redux/middleware/ResearchMiddleware";
import { AppDispatch, RootState } from "../../redux/store";

export default function RespodentResearchDetail(): JSX.Element {
  const research = useSelector(
    (state: RootState) => state.research.selectedResearch
  );
  const user = useSelector(
    (state: RootState) => state.user.user
  );

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

  console.log(tokenExpired());

  return (
    <div className="flex-grow p-10 grid grid-flow-row gap-10 justify-items-center content-start">
      <ResearchHeader research={research} user={user} tokenExpired={tokenExpired()} />
      {research?.researchSetup && !tokenExpired() ?
          <button
            className="w-64 button button-nav hover:button-hover"
            onClick={() => navigate(`/setup/${id}`)}
          >Mulai Tes!</button>
      : ""}
    </div>
  );
}

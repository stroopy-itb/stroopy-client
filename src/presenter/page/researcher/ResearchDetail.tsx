import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ResearchHeader } from "../../component";
import researchMiddleware from "../../redux/middleware/ResearchMiddleware";
import { AppDispatch, RootState } from "../../redux/store";

export default function ResearchDetail(): JSX.Element {
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

  const [currentDate] = useState(new Date());
  const tokenExpired = useCallback(() => {
    if (research?.researchToken) {
      return currentDate > research.researchToken.expiredAt;
    }
    return true;
  }, [research, currentDate]);

  return (
    <div className="flex-grow p-10 grid grid-flow-row gap-10 justify-items-center content-start">
      <ResearchHeader research={research} user={user} tokenExpired={tokenExpired()} />
    </div>
  );
}

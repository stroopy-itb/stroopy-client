import React, { useEffect, useState } from "react";
import ColorPair from "../../../domain/model/ColorPair";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import {
  researchMiddleware,
  testResultMiddleware,
} from "../../redux/middleware";
import { Stroop } from "../../component";

export default function StroopPage(): JSX.Element {
  const localSetup = useSelector(
    (state: RootState) => state.research.localSetup
  );
  const research = useSelector(
    (state: RootState) => state.research.selectedResearch
  );

  const { researchId } = useParams();

  const [pairs] = useState<ColorPair[]>(localSetup.pairs);

  const [rounds, setRounds] = useState(localSetup.rounds);

  const [roundTimeout, setRoundTimeout] = useState(localSetup.timeout);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    if (researchId) {
      if (research) {
        setRounds(research.researchSetup.rounds);
        setRoundTimeout(research.researchSetup.timeout);
      }
      if (!research || !research.researchSetup || research.id !== researchId) {
        dispatch(researchMiddleware.getOneById({ id: researchId || "" }));
      }
    }
  }, [researchId, research, dispatch]);

  console.log(rounds);
  console.log(roundTimeout);
  

  return (
    <Stroop
      setup={{
        pairs,
        rounds,
        timeout: roundTimeout,
      }}
      isPractice={false}
      onFinish={(results) => {
        dispatch(testResultMiddleware.setResultData(results));
        navigate(`/result/${researchId}`);
      }}
    />
  );
}

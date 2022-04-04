import React, { useEffect, useState } from "react";
import { AnswerRecord, AnswerStatus, Result } from "../../../domain/model";
import ColorPair from "../../../domain/model/ColorPair";
import { Prompt } from "../../../domain/model/Prompt";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import researchMiddleware from "../../redux/middleware/ResearchMiddleware";
import { testResultMiddleware } from "../../redux/middleware";

export default function Stroop(): JSX.Element {
  const setup = useSelector((state: RootState) => state.research.localSetup);
  const research = useSelector((state: RootState) => state.research.selectedResearch);

  const { researchId } = useParams();

  const [pairs] = useState<ColorPair[]>(setup.pairs);

  const [timeLimit] = useState(setup.timeLimit * 1000);

  const [rounds, setRounds] = useState(research?.researchSetup.rounds || 50);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!research || !research.researchSetup || research.id !== researchId)
    {
      dispatch(researchMiddleware.getOneById({ id: researchId || "" }));
    }

    if (research) {
      setRounds(research.researchSetup.rounds)
    }
  }, [researchId, research, dispatch] );

  const pickRandomPair = (): ColorPair => {
    const text = pairs[Math.floor(Math.random() * pairs.length)];
    let color = pairs[Math.floor(Math.random() * pairs.length)];
    while (color === text) {
      color = pairs[Math.floor(Math.random() * pairs.length)];
    }

    return {
      text: text.text,
      color: color.color,
    };
  };

  const randomPrompt = (): Prompt => {
    // return Math.random() < 0.5 ? Prompt.Text : Prompt.Color;
    return Prompt.Color;
  };

  const [stroopKey, setStroopKey] = useState<ColorPair>(pickRandomPair);

  const [prompt, setPrompt] = useState<Prompt>(randomPrompt);

  const [answerRecords, setAnswerRecords] = useState<AnswerRecord[]>([]);

  const chooseAnswer = (answer: ColorPair | undefined, time: number) => {
    const newRecord: AnswerRecord = {
      status: AnswerStatus.Unanswered,
      time: (timeLimit - time) / 1000,
    };

    if (answerRecords.length >= rounds) {
      countResult();
      return;
    }

    if (!answer) {
      setAnswerRecords((oldRecord) => [...oldRecord, newRecord]);
      setStroopKey(pickRandomPair);
      setPrompt(randomPrompt);
      setTimerId(Math.random());
      return;
    }

    switch (prompt) {
      case Prompt.Color:
        newRecord.status =
          stroopKey.color === answer.color
            ? AnswerStatus.Correct
            : AnswerStatus.Wrong;
        break;
      case Prompt.Text:
        newRecord.status =
          stroopKey.text === answer.text
            ? AnswerStatus.Correct
            : AnswerStatus.Wrong;
        break;
      default:
        break;
    }
    setAnswerRecords((oldRecord) => [...oldRecord, newRecord]);
    setStroopKey(pickRandomPair);
    setPrompt(randomPrompt);
    setTimerId(Math.random());
  };

  // TODO: fix timer logic or create from scratch (this logic is stupid)
  const [timerId, setTimerId] = useState(Math.random());
  const resetTimer = (time: number) => {
    if (time < 0 && answerRecords.length < rounds) {
      chooseAnswer(undefined, 0);
    }
  };

  const navigate = useNavigate();
  const countResult = () => {
    let result: Result = {
      correct: 0,
      wrong: 0,
      unanswered: 0,
      rtca: 0,
    };

    answerRecords.map((record) => {
      switch (record.status) {
        case AnswerStatus.Correct:
          ++result.correct;
          result.rtca += record.time || 0;
          break;
        case AnswerStatus.Wrong:
          ++result.wrong;
          break;
        case AnswerStatus.Unanswered:
          ++result.unanswered;
          break;
      }
    });

    result.rtca = result.rtca / result.correct;

    dispatch(testResultMiddleware.setResultData({...result, answerRecords}));
    navigate(`/result/${researchId}`);
  };

  return (
    <div className="flex-grow grid grid-flow-row gap-16 justify-items-center content-center">
      <h1
        className="text-center text-5xl font-bold"
        style={{ color: stroopKey.color }}
      >
        {stroopKey.text}
      </h1>
      {/* <h2 style={{ fontWeight: "bold", color: "white" }}>{promptToString(prompt)}</h2> */}

      <Countdown
        key={timerId}
        intervalDelay={0}
        precision={3}
        date={Date.now() + timeLimit}
        onTick={({ total }) => resetTimer(total)}
        overtime
        autoStart={false}
        renderer={({ total, seconds, milliseconds, api }) => {
          if (research) {
            api.start();
          }
          if (answerRecords.length >= rounds && total <= 0) {
            api.stop();
          }
          return (
            <div className="grid grid-flow-row gap-16">
              <h2 className="text-center text-2xl font-bold text-white">{`${seconds}.${milliseconds}`}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
                {pairs.map((pair) => (
                  <button
                    key={pair.text}
                    className="p-16 rounded-lg"
                    style={{ backgroundColor: pair.color }}
                    onClick={() => chooseAnswer(pair, total)}
                  />
                ))}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}

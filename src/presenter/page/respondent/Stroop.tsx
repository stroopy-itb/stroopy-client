import React, { useCallback, useEffect, useState } from "react";
import { AnswerRecord, AnswerStatus, Result } from "../../../domain/model";
import ColorPair from "../../../domain/model/ColorPair";
import { Prompt } from "../../../domain/model/Prompt";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import {
  researchMiddleware,
  testResultMiddleware,
} from "../../redux/middleware";
import useCountDown from "react-countdown-hook";

enum GameState {
  Pending,
  Countdown,
  Started,
  Ended,
}

export default function Stroop(): JSX.Element {
  const setup = useSelector((state: RootState) => state.research.localSetup);
  const research = useSelector(
    (state: RootState) => state.research.selectedResearch
  );

  const { researchId } = useParams();

  const [pairs] = useState<ColorPair[]>(setup.pairs);

  const [roundTime] = useState(setup.timeLimit * 1000);

  const rounds = useCallback(() => {
    return research?.researchSetup.rounds || 50;
  }, [research]);

  const [started, setStarted] = useState<GameState>(GameState.Pending);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!research || !research.researchSetup || research.id !== researchId) {
      dispatch(researchMiddleware.getOneById({ id: researchId || "" }));
    }
  }, [researchId, research, dispatch]);

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

  const [timeleft, actions] = useCountDown(roundTime, 100);

  useEffect(() => {
    if (timeleft <= 0) {
      switch (started) {
        case GameState.Started:
        case GameState.Countdown:
          chooseAnswer(undefined, 0);
          break;
        case GameState.Ended:
          countResult();
          break;
        default:
          break;
      }
    }
  }, [timeleft, started]);

  const chooseAnswer = (answer: ColorPair | undefined, time: number) => {
    if (started < GameState.Started) {
      actions.start();
      setStarted(GameState.Started);
      return;
    }

    const newRecord: AnswerRecord = {
      status: AnswerStatus.Unanswered,
      time: (roundTime - time) / 1000,
    };

    if (!answer) {
      setAnswerRecords((oldRecord) => [...oldRecord, newRecord]);
      setStroopKey(pickRandomPair);
      setPrompt(randomPrompt);
      actions.start();
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

    if (answerRecords.length >= rounds()) {
      actions.start(5000);
      setStarted(GameState.Ended);
      return;
    }

    setStroopKey(pickRandomPair);
    setPrompt(randomPrompt);
    actions.start();
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

    dispatch(testResultMiddleware.setResultData({ ...result, answerRecords }));
    navigate(`/result/${researchId}`);
  };

  return (
    <div className="flex-grow grid grid-flow-row gap-12 justify-items-center content-center">
      <h1
        className="text-center text-5xl font-bold"
        style={{ color: stroopKey.color }}
      >
        {stroopKey.text}
      </h1>
      {/* <h2 style={{ fontWeight: "bold", color: "white" }}>{promptToString(prompt)}</h2> */}
      <h2
        className={`text-center font-bold text-white ${
          started === GameState.Started ? "text-2xl" : "text-4xl"
        }`}
      >
        {started === GameState.Started
          ? (timeleft / 1000).toFixed(2)
          : (timeleft / 1000).toFixed()}
      </h2>
      {started < GameState.Started ? (
        <div>
          <p className="text-center text-xl text-white">
            {`${rounds()} pengulangan`}
          </p>
          <p className="text-center text-xl text-white">
            Pilih jawaban sesuai warna
          </p>
        </div>
      ) : (
        ""
      )}
      {started === GameState.Ended ? (
        <div>
          <p className="text-center text-xl text-white">Pengujian Selesai</p>
        </div>
      ) : (
        ""
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
        {pairs.map((pair) => (
          <div key={pair.text}>
            <button
              className="w-full p-16 rounded-lg"
              style={{ backgroundColor: pair.color }}
              onClick={() => chooseAnswer(pair, timeleft)}
              disabled={started !== GameState.Started}
            ></button>
            {started < GameState.Started ? (
              <h2
                className="text-xl font-bold text-center"
                style={{ color: pair.color }}
              >
                {pair.text}
              </h2>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      {started < GameState.Countdown ? (
        <button
          className="button button-nav"
          onClick={() => {
            actions.start(5000);
            setStarted(GameState.Countdown);
          }}
        >
          Mulai!
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

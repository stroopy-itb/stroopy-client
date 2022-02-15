import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnswerRecord, AnswerStatus, Result } from "../model";
import ColorPair from "../model/ColorPair";
import { Prompt } from "../model/Prompt";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { updateResult } from "../redux/reducer/ExamReducer";
import { useNavigate } from "react-router-dom";

export default function Stroop(): JSX.Element {
  const setup = useSelector((state: RootState) => state.exam.setup);

  const [pairs, setPairs] = useState<ColorPair[]>(setup.pairs);

  const [answerLimit, setAnswerLimit] = useState(setup.answerLimit);

  const [timeLimit, setTimeLimit] = useState(setup.timeLimit * 1000);

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

    if (answerRecords.length >= answerLimit) {
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
    if (time < 0 && answerRecords.length < answerLimit) {
      chooseAnswer(undefined, 0);
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const countResult = () => {
    let result: Result = {
      corrects: 0,
      wrongs: 0,
      unanswered: 0,
      rtca: 0,
    };

    answerRecords.map((record) => {
      switch (record.status) {
        case AnswerStatus.Correct:
          ++result.corrects;
          result.rtca += record.time || 0;
          break;
        case AnswerStatus.Wrong:
          ++result.wrongs;
          break;
        case AnswerStatus.Unanswered:
          ++result.unanswered;
          break;
      }
    });

    result.rtca = result.rtca / result.corrects;

    dispatch(updateResult(result));
    navigate("/result");
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
        renderer={({ total, seconds, milliseconds, api }) => {
          if (answerRecords.length >= answerLimit && total <= 0) {
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

      <div className="h-52 overflow-y-auto text-white text-center w-full md:w-1/3">
        {answerRecords.length > 0 ? (
          <table className="w-full">
            <thead className="font-bold">
              <tr>
                <th>#</th>
                <th>Correct</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {answerRecords.map((answerRecord, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{answerRecord.status}</td>
                    <td>{answerRecord.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

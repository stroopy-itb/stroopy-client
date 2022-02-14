import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AnswerRecord,
  AnswerStatus,
  answerStatusToString,
} from "../model/AnswerRecord";
import ColorPair from "../model/ColorPair";
import { Prompt, promptToString } from "../model/Prompt";
import Countdown from "react-countdown";
import { Result } from "../model/Result";

export default function StroopPage(): JSX.Element {
  const [pairs, setPairs] = useState<ColorPair[]>([
    {
      text: "Red",
      color: "#FF5555",
    },
    {
      text: "Green",
      color: "#58D95D",
    },
    {
      text: "Blue",
      color: "#4D74FF",
    },
    {
      text: "Yellow",
      color: "#FFB800",
    },
  ]);

  const [answerLimit, setAnswerLimit] = useState(50);

  const [timeLimit, setTimeLimit] = useState(3 * 1000);

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

  const [result, setResult] = useState<Result>();

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

  const countResult = () => {
    let tempResult: Result = {
      corrects: 0,
      wrongs: 0,
      unanswered: 0,
      rtca: 0,
    };

    answerRecords.map((record) => {
      switch (record.status) {
        case AnswerStatus.Correct:
          ++tempResult.corrects;
          tempResult.rtca += record.time || 0;
          break;
        case AnswerStatus.Wrong:
          ++tempResult.wrongs;
          break;
        case AnswerStatus.Unanswered:
          ++tempResult.unanswered;
          break;
      }
    });

    tempResult.rtca = tempResult.rtca / tempResult.corrects;

    setResult(tempResult);
  };

  return (
    <div className="min-h-screen grid grid-flow-row gap-16 justify-items-stretch content-center">
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

      {result ? (
        <div className="h-52 text-white text-center grid grid-flow-row gap-2">
          <div className="grid grid-cols-3">
            <div>
              <h2 className="text-xl font-bold">Correct</h2>
              <h4>{result.corrects}</h4>
            </div>
            <div>
              <h2 className="text-xl font-bold">Wrong</h2>
              <h4>{result.wrongs}</h4>
            </div>
            <div>
              <h2 className="text-xl font-bold">Unanswered</h2>
              <h4>{result.unanswered}</h4>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">RTCA</h2>
            <h3 className="text-md font-bold">
              (Right Time for Correct Answer)
            </h3>
            <h4>{result.rtca.toPrecision(3)}</h4>
          </div>
        </div>
      ) : (
        <div className="h-52 overflow-y-auto">
          <table className="text-white text-center w-full">
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
                    <td>{answerStatusToString(answerRecord.status)}</td>
                    <td>{answerRecord.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

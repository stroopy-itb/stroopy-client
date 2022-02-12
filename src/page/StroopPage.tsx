import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnswerRecord, AnswerStatus, answerStatusToString } from "../model/AnswerRecord";
import ColorPair from "../model/ColorPair";
import { Prompt, promptToString } from "../model/Prompt";
import Countdown from "react-countdown";

export default function StroopPage(): JSX.Element {
    const [pairs, setPairs] = useState<ColorPair[]>([
        {
            text: "Red",
            color: "#ff0000",
        },
        {
            text: "Green",
            color: "#00ff00",
        },
        {
            text: "Blue",
            color: "#0000ff",
        },
        {
            text: "Yellow",
            color: "#ffff00",
        },
    ])

    const pickRandomPair = (): ColorPair => {
        const text = pairs[Math.floor(Math.random() * pairs.length)];
        let color = pairs[Math.floor(Math.random() * pairs.length)];
        while (color === text) {
            color = pairs[Math.floor(Math.random() * pairs.length)];
        }

        return {
            text: text.text,
            color: color.color,
        }
    }

    const randomPrompt = (): Prompt => {
        // return Math.random() < 0.5 ? Prompt.Text : Prompt.Color;
        return Prompt.Color;
    }

    const [stroopKey, setStroopKey] = useState<ColorPair>(pickRandomPair);

    const [prompt, setPrompt] = useState<Prompt>(randomPrompt);

    const [answerRecords, setAnswerRecords] = useState<AnswerRecord[]>([]);

    const chooseAnswer = (answer: ColorPair | undefined, time: number) => {
        const newRecord: AnswerRecord = {status: AnswerStatus.Unanswered, time};

        if (!answer) {
            setAnswerRecords(oldRecord => [...oldRecord, newRecord]);
            setStroopKey(pickRandomPair);
            setPrompt(randomPrompt);
            return;
        }

        switch (prompt) {
            case Prompt.Color:
                newRecord.status = stroopKey.color === answer.color ? AnswerStatus.Correct : AnswerStatus.Wrong;
                break;
            case Prompt.Text:
                newRecord.status = stroopKey.text === answer.text ? AnswerStatus.Correct : AnswerStatus.Wrong;
                break;
            default:
                break;
        }
        setAnswerRecords(oldRecord => [...oldRecord, newRecord]);
        setStroopKey(pickRandomPair);
        setPrompt(randomPrompt);
        setTimerId(Math.random());
    }

    // TODO: fix timer logic/or create from scratch (this logic is stupid)
    const [timerId, setTimerId] = useState(Math.random());
    const resetTimer = (time: number) => {
        if (time < 0) {
            chooseAnswer(undefined, 0);
        }
    }

    return (
        <div style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" }}>
            <h1 style={{ fontWeight: "bold", color: stroopKey.color }}>{stroopKey.text}</h1>
            {/* <h2 style={{ fontWeight: "bold", color: "white" }}>{promptToString(prompt)}</h2> */}
            
            <Countdown 
                key={timerId} 
                intervalDelay={0} 
                precision={3} 
                date={Date.now() + 3000} 
                onTick={({total}) => resetTimer(total)}
                overtime
                renderer={({total}) => {
                    return (
                    <div>
                        <h2 style={{color: "white"}}>{total}</h2>
                        <div>
                        {pairs.map((pair) => (
                            <button key={pair.text} style={{ backgroundColor: pair.color, margin: "2em", padding: "2em" }} onClick={() => chooseAnswer(pair, total)}/>
                        ))}
                        </div>
                    </div> 
                )}}
            />

            <table style={{ color: "white", width: "100%" }}>
                <thead>
                    <tr>
                        <th>Correct</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                {answerRecords.map(answerRecord => (
                    <tr>
                        <td>{answerStatusToString(answerRecord.status)}</td>
                        <td>{answerRecord.time}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
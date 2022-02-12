import React, { useState } from "react";
import { AnswerRecord, AnswerStatus, answerStatusToString } from "../model/AnswerRecord";
import ColorPair from "../model/ColorPair";
import { Prompt, promptToString } from "../model/Prompt";

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
        {
            text: "Orange",
            color: "#ff8000",
        },
        {
            text: "Purple",
            color: "#8000ff",
        },
    ])

    const pickRandomPair = (): ColorPair => {
        return {
            text: pairs[Math.floor(Math.random() * pairs.length)].text,
            color: pairs[Math.floor(Math.random() * pairs.length)].color,
        }
    }

    const randomPrompt = (): Prompt => {
        // return Math.random() < 0.5 ? Prompt.Text : Prompt.Color;
        return Prompt.Color;
    }

    const [stroopKey, setStroopKey] = useState<ColorPair>(pickRandomPair);

    const [prompt, setPrompt] = useState<Prompt>(randomPrompt);

    const [answerRecords, setAnswerRecords] = useState<AnswerRecord[]>([]);

    const chooseAnswer = (answer: ColorPair | undefined) => {
        const newRecord: AnswerRecord = {status: AnswerStatus.Unanswered, time: 0};

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
    }

    return (
        <div style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" }}>
            <h1 style={{ fontWeight: "bold", color: stroopKey.color }}>{stroopKey.text}</h1>
            <h2 style={{ fontWeight: "bold", color: "white" }}>{promptToString(prompt)}</h2>
            <div>
            {pairs.map((pair) => (
                <button style={{ backgroundColor: pair.color, margin: "2em", padding: "2em" }} onClick={() => chooseAnswer(pair)}>{pair.text}</button>
            ))}
            </div>
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
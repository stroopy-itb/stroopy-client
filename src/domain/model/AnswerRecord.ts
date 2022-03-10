import { AnswerStatus } from "./AnswerStatus";

export default interface AnswerRecord {
    status: AnswerStatus;
    time: number | undefined;
}

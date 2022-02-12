export enum AnswerStatus {
    Correct,
    Wrong,
    Unanswered
}

export interface AnswerRecord {
    status: AnswerStatus;
    time: number | undefined;
}

export const answerStatusToString = (status: AnswerStatus): string => {
    switch (status) {
        case AnswerStatus.Correct:
            return "Correct";
        case AnswerStatus.Wrong:
            return "Wrong";
        case AnswerStatus.Unanswered:
            return "Unanswered";
    }
}
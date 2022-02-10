export enum Prompt {
    Text,
    Color
}

export const promptToString = (prompt: Prompt): string => {
    switch (prompt) {
        case Prompt.Text:
            return "Text";
        case Prompt.Color:
            return "Color";
        default:
            return "Text";
    }
}
import type { Attempt } from "./Attempt";

export interface AttemptQuestion {
    id: number;
    attempt : Attempt;
    user_answer: string;
    is_correct: boolean;
    date: Date;
}
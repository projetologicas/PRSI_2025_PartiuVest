export interface AttemptQuestion {
    id: number;
    attempt_id : number;
    question_id : number;
    user_answer: string;
    right_answer: string;
    date: Date;
}
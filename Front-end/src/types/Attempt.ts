import type { AttemptQuestion } from "./AttemptQuestion";

export interface Attempt {
    id : number;
    question_book_id : number;
    user_id : number;
    start_date : Date;
    end_date : Date;
    questions : AttemptQuestion[];
    correct_answers : number;
    total_questions : number;
}
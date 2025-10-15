import type { QuestionBook } from "./QuestionBook";
import type { User } from "./User";

export interface Attempt {
    id : number;
    question_book : QuestionBook;
    user : User;
    start_date : Date;
    end_date : Date;
}
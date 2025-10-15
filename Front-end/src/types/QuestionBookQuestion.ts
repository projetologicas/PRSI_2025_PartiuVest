import type { Question } from "./Question";
import type { QuestionBook } from "./QuestionBook";

export interface QuestionBookQuestion {
    question: Question;
    question_book : QuestionBook;
}
import type { Question } from "./Question";
import type { User } from "./User";

export interface Comment {
    id : number;
    question : Question;
    user : User;
    content : string;
    date : Date;
}
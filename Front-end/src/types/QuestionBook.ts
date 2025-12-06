export interface QuestionBook {
    id : number;
    creation_date : Date;
    model: string;
    user_id : number;
    r_generated : boolean;
    questions_id : number[];
}
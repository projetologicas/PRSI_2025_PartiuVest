export type Model = 'ENEM' | 'FUVEST' | 'UNESP' | 'OUTRO';

export interface QuestionBook {
    id : number;
    creation_date : Date;
    model: Model;
    r_generated : boolean;
}
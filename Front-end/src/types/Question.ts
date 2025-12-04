export type Area = 'Linguagens, Códigos e suas Tecnologias' | 'Ciências Humanas e suas Tecnologias' | 'Ciências da Natureza e suas Tecnologias' | 'Matemática e suas Tecnologias';

export interface Question {
    id : number;
    title : string;
    image_url : string;
    enum_a : string;
    enum_b : string;
    enum_c : string;
    enum_d : string;
    enum_e : string;
    answer : string;
    number : number;
}
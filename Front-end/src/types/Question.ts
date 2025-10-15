export type Area = 'Linguagens, Códigos e suas Tecnologias' | 'Ciências Humanas e suas Tecnologias' | 'Ciências da Natureza e suas Tecnologias' | 'Matemática e suas Tecnologias';

export interface Question {
    id : number;
    title : string;
    image_url : string;
    number : number;
    answer : string;
    area : Area;
}
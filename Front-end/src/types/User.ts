export interface User {
    id : number;
	email : string;
	password : string;
	name : string;
	sign_date : Date;
	streak : number;
    points : number;
    xp : number;
    exerciciosFeitos: number;
    rank: string;
}
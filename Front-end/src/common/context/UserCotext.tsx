import { useState, createContext } from 'react';
import axios from 'axios';
import { getTokenCookie } from '../../services/Cookies.ts';

export const UserContext = createContext({
    name: "",
    setName: (name: string) => { },
    email: "",
    setEmail: (email: string) => { },
    password: "",
    setPassword: (password: string) => { },
    streak: 0,
    setStreak: (streak: number) => { },
    points: 0,
    setPoints: (points: number) => { },
    xp: 0,
    setXp: (xp: number) => { },
    exerciciosFeitos: 0,
    setExerciciosFeitos: (exerciciosFeitos: number) => { },
    rank: "",
    setRank: (rank: string) => { },
    sign_date: new Date(),
    setSignDate: (sign_date: Date) => { },
    role: "",
    setRole: (role: string) => { },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [streak, setStreak] = useState(0);
    const [points, setPoints] = useState(0);
    const [xp, setXp] = useState(0);
    const [exerciciosFeitos, setExerciciosFeitos] = useState(0);
    const [rank, setRank] = useState("");
    const [sign_date, setSignDate] = useState(new Date());
    const [role, setRole] = useState("");
    return (
        <UserContext.Provider value={{ name, setName, email, setEmail, password, setPassword, streak, setStreak, points, setPoints, xp, setXp, exerciciosFeitos, setExerciciosFeitos, rank, setRank, sign_date, setSignDate, role, setRole }}>
            {children}
        </UserContext.Provider>
    )
}

export const refreshUserContext = async (userContext: any) => {
    const userResp = await axios.get("http://localhost:8080/api/data", {
        headers: {
            'Authorization': `Bearer ${getTokenCookie()}`
        }
        });

    userContext.setName(userResp.data.name);
    userContext.setEmail(userResp.data.email);
    userContext.setStreak(userResp.data.streak);
    userContext.setPoints(userResp.data.points);
    userContext.setXp(userResp.data.xp);
    //userContext.setExerciciosFeitos(userResp.data.exerciciosFeitos); // different backend request for all questions user answered
    //userContext.setRank(userResp.data.rank); // client-side calculated by xp formula
    userContext.setSignDate(new Date(userResp.data.sign_date));
    userContext.setRole(userResp.data.role);
}   
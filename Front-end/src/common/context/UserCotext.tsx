import { useState, createContext } from 'react';

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
    return (
        <UserContext.Provider value={{ name, setName, email, setEmail, password, setPassword, streak, setStreak, points, setPoints, xp, setXp, exerciciosFeitos, setExerciciosFeitos, rank, setRank }}>
            {children}
        </UserContext.Provider>
    )
}
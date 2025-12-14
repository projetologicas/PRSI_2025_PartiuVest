import { useState, createContext, useEffect } from 'react';
import api from '../../services/api';
import { getTokenCookie } from '../../services/Cookies';
import type { ShopItem } from '../../types/ShopItem';

// 1. DEFINIÇÃO DA TIPAGEM (Resolve os erros S2339)
interface UserContextType {
    name: string;
    setName: (name: string) => void;
    points: number;
    setPoints: (points: number) => void;
    items: ShopItem[];
    setItems: (items: ShopItem[]) => void;
    currentAvatar: string;
    setCurrentAvatar: (url: string) => void;
    currentTitle: string;
    setCurrentTitle: (title: string) => void;
    currentTheme: string;
    setCurrentTheme: (theme: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    streak: number;
    setStreak: (streak: number) => void;
    xp: number;
    setXp: (xp: number) => void;
    exerciciosFeitos: number;
    setExerciciosFeitos: (n: number) => void;
    rank: string;
    setRank: (rank: string) => void;
    sign_date: Date;
    setSignDate: (date: Date) => void;

    // As novas propriedades tipadas corretamente
    role: string;
    setRole: (role: string) => void;
    isLoading: boolean;

    refreshUser: () => Promise<void>;
}

// 2. CRIAÇÃO DO CONTEXTO COM O TIPO
// O "as UserContextType" diz ao TS para confiar que vamos preencher esses dados
export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    // --- ESTADOS ---
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [points, setPoints] = useState(0);
    const [items, setItems] = useState<ShopItem[]>([]);
    const [currentAvatar, setCurrentAvatar] = useState("");
    const [currentTitle, setCurrentTitle] = useState("");
    const [currentTheme, setCurrentTheme] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [streak, setStreak] = useState(0);
    const [xp, setXp] = useState(0);
    const [exerciciosFeitos, setExerciciosFeitos] = useState(0);
    const [rank, setRank] = useState("");
    const [sign_date, setSignDate] = useState(new Date());
    const [role, setRole] = useState("");

    const refreshUser = async () => {
        setIsLoading(true);
        try {
            const token = getTokenCookie();
            if (!token) {
                setIsLoading(false);
                return;
            }

            console.log("🔄 UserProvider: Buscando dados...");
            const userResp = await api.get("/api/data", {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = userResp.data;
            console.log("✅ UserProvider: Role recebida:", data.role);

            setName(data.name);
            setEmail(data.email);
            setStreak(data.streak);
            setPoints(data.points ?? data.coins ?? 0);
            setItems(data.items || []);
            setCurrentAvatar(data.currentAvatarUrl || "");
            setCurrentTitle(data.currentTitle || "");
            setCurrentTheme(data.currentTheme || "");
            setXp(data.xp);
            if(data.sign_date) setSignDate(new Date(data.sign_date));

            setRole(data.role || "USER");

        } catch (error) {
            console.error("❌ Erro ao atualizar UserProvider:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if(getTokenCookie()) {
            refreshUser();
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider value={{
            name, setName,
            points, setPoints,
            items, setItems,
            currentAvatar, setCurrentAvatar,
            currentTitle, setCurrentTitle,
            currentTheme, setCurrentTheme,
            email, setEmail,
            password, setPassword,
            streak, setStreak,
            xp, setXp,
            exerciciosFeitos, setExerciciosFeitos,
            rank, setRank,
            sign_date, setSignDate,
            role, setRole,
            isLoading,
            refreshUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

// 3. CORREÇÃO ESLINT (Fast Refresh)
// Adicionamos esta linha acima da função para silenciar o aviso do ESLint
// eslint-disable-next-line react-refresh/only-export-components
export const refreshUserContext = async (userContext: any) => {
    if (userContext.refreshUser) {
        await userContext.refreshUser();
    }
}
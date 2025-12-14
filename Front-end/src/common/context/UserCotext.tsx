import { useState, createContext, useEffect } from 'react';
import api from '../../services/api';
import { getTokenCookie } from '../../services/Cookies';
import type { ShopItem } from '../../types/ShopItem';

export const UserContext = createContext({
    name: "", setName: (name: string) => { },
    points: 0, setPoints: (points: number) => { },
    items: [] as ShopItem[], setItems: (items: ShopItem[]) => { },
    currentAvatar: "", setCurrentAvatar: (url: string) => { },
    currentTitle: "", setCurrentTitle: (title: string) => { },
    currentTheme: "", setCurrentTheme: (theme: string) => { },
    email: "", setEmail: (email: string) => { },
    password: "", setPassword: (password: string) => { },
    streak: 0, setStreak: (streak: number) => { },
    xp: 0, setXp: (xp: number) => { },
    exerciciosFeitos: 0, setExerciciosFeitos: (exerciciosFeitos: number) => { },
    rank: "", setRank: (rank: string) => { },
    sign_date: new Date(), setSignDate: (sign_date: Date) => { },
    role: "", setRole: (role: string) => { },

    // --- NOVO: A função de recarregar agora faz parte do contexto! ---
    refreshUser: async () => { }
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
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
        try {
            const token = getTokenCookie();
            if (!token) return;

            console.log("🔄 UserProvider: Buscando dados...");

            const userResp = await api.get("/api/data", {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = userResp.data;
            console.log("✅ UserProvider: Dados recebidos. Tema:", data.currentTheme);

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
            setRole(data.role);

        } catch (error) {
            console.error("❌ Erro ao atualizar UserProvider:", error);
        }
    };

    useEffect(() => {
        if(getTokenCookie()) {
            refreshUser();
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
            refreshUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const refreshUserContext = async (userContext: any) => {
    if (userContext.refreshUser) {
        await userContext.refreshUser();
    } else {
        console.warn("⚠️ refreshUserContext chamado sem acesso à função interna.");
    }
}
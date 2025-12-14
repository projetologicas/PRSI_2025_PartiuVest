import { useState, createContext, useEffect } from 'react'; // << Adicionado useEffect
import api from '../../services/api';
import { getTokenCookie } from '../../services/Cookies';
import type {ShopItem} from '../../types/ShopItem';

export const UserContext = createContext({
    name: "",
    setName: (name: string) => { },
    points: 0,
    setPoints: (points: number) => { },
    items: [] as ShopItem[],
    setItems: (items: ShopItem[]) => { },
    currentAvatar: "",
    setCurrentAvatar: (url: string) => { },
    currentTitle: "",
    setCurrentTitle: (title: string) => { },
    currentTheme: "",
    setCurrentTheme: (theme: string) => { },
    email: "",
    setEmail: (email: string) => { },
    password: "",
    setPassword: (password: string) => { },
    streak: 0,
    setStreak: (streak: number) => { },
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
    
    // NOVO CAMPO DE ESTADO DE CARREGAMENTO
    isLoading: true,
    setIsLoading: (loading: boolean) => {},
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
    
    // NOVO ESTADO: Inicia como true
    const [isLoading, setIsLoading] = useState(true); 

    // Cria o objeto de valor do contexto para ser usado dentro do useEffect
    const contextValue = {
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
        isLoading, setIsLoading
    };

    // BLOCO CRÍTICO: Dispara o carregamento dos dados
    useEffect(() => {
        const token = getTokenCookie();
        if (token) {
            // Se há um token, carrega os dados
            refreshUserContext(contextValue);
        } else {
            // Se não há token, não há dados para carregar, marca como pronto.
            setIsLoading(false);
        }
    }, []); // Array de dependência vazio garante que roda apenas na montagem

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

// FUNÇÃO CRÍTICA: Responsável por setar o estado de carregamento como false
export const refreshUserContext = async (userContext: any) => {
    // É bom garantir que, ao chamar essa função, o loading esteja true
    userContext.setIsLoading(true); 

    try {
        const userResp = await api.get("/api/data", {
            headers: {
                'Authorization': `Bearer ${getTokenCookie()}`
            }
        });

        userContext.setName(userResp.data.name);
        userContext.setEmail(userResp.data.email);
        userContext.setStreak(userResp.data.streak);
        userContext.setPoints(userResp.data.points ?? userResp.data.coins ?? 0);
        userContext.setItems(userResp.data.items || []);

        userContext.setCurrentAvatar(userResp.data.currentAvatarUrl || "");
        userContext.setCurrentTitle(userResp.data.currentTitle || "");
        userContext.setCurrentTheme(userResp.data.currentTheme || "");

        userContext.setXp(userResp.data.xp);
        userContext.setSignDate(new Date(userResp.data.sign_date));
        userContext.setRole(userResp.data.role);

    } catch (error) {
        console.error("Erro ao atualizar contexto:", error);
    } finally {
        // ESSENCIAL: Sinaliza que o carregamento terminou, liberando o AdminRoute.
        userContext.setIsLoading(false); 
    }
}
import { useState, createContext } from 'react';

export const SystemContext = createContext({
    error: null as string | null,
    setError: (error: string | null) => { },
    loading: false,
    setLoading: (loading: boolean) => { },
});

export const SystemProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    return (
        <SystemContext.Provider value={{ error, setError, loading, setLoading }}>
            {children}
        </SystemContext.Provider>
    )
}
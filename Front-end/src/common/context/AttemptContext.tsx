import { useState, createContext } from 'react';
import type { Attempt } from '../../types/Attempt.ts';

export const AttemptContext = createContext({
    attempt: null as Attempt | null,
    setAttempt: (attempt: Attempt | null) => { },
});

export const AttemptProvider = ({ children }: { children: React.ReactNode }) => {
    const [attempt, setAttempt] = useState(null as Attempt | null);
    return (
        <AttemptContext.Provider value={{ attempt, setAttempt}}>
            {children}
        </AttemptContext.Provider>
    )
}


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import App from './App.tsx'

// IMPORTS
import { UserProvider } from './common/context/UserCotext'
import { SystemProvider } from './common/context/SystemContext'
import { ThemeManager } from './components/ThemeManager'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SystemProvider>
            <UserProvider>

                <ThemeManager />

                <App />
            </UserProvider>
        </SystemProvider>
    </StrictMode>,
)
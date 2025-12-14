import { useContext, useEffect } from "react";
import { UserContext } from "../common/context/UserCotext";

export function ThemeManager() {
    const { currentTheme, refreshUser } = useContext(UserContext);

    useEffect(() => {
        console.log("🎨 ThemeManager: Aplicando tema ->", currentTheme || "Padrão");

        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }, [currentTheme]);

    useEffect(() => {
        if (!currentTheme) {
            refreshUser();
        }
    }, []);

    return null;
}
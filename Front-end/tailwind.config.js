/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                theme: {
                    bg: 'var(--theme-bg)',
                    card: 'var(--theme-card)',
                    text: 'var(--theme-text)',
                    subtext: 'var(--theme-subtext)',
                    accent: 'var(--theme-accent)',
                    border: 'var(--theme-border)',
                }
            },
        },
    },
    plugins: [],
}
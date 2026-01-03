// Theme definitions and utilities
export type ThemeType = 'light' | 'dark' | 'color';

export interface ThemeColors {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    card: string;
    cardForeground: string;
    destructive: string;
    destructiveForeground: string;
    success: string;
    successForeground: string;
}

export const themes: Record<ThemeType, ThemeColors> = {
    light: {
        background: '#ffffff',
        foreground: '#0a0a0a',
        primary: '#0a0a0a',
        primaryForeground: '#fafafa',
        secondary: '#f4f4f5',
        secondaryForeground: '#18181b',
        accent: '#f4f4f5',
        accentForeground: '#18181b',
        muted: '#f4f4f5',
        mutedForeground: '#71717a',
        border: '#e4e4e7',
        card: '#ffffff',
        cardForeground: '#0a0a0a',
        destructive: '#ef4444',
        destructiveForeground: '#fafafa',
        success: '#22c55e',
        successForeground: '#fafafa',
    },
    dark: {
        background: '#0a0a0a',
        foreground: '#fafafa',
        primary: '#fafafa',
        primaryForeground: '#0a0a0a',
        secondary: '#27272a',
        secondaryForeground: '#fafafa',
        accent: '#27272a',
        accentForeground: '#fafafa',
        muted: '#27272a',
        mutedForeground: '#a1a1aa',
        border: '#27272a',
        card: '#0a0a0a',
        cardForeground: '#fafafa',
        destructive: '#dc2626',
        destructiveForeground: '#fafafa',
        success: '#16a34a',
        successForeground: '#fafafa',
    },
    color: {
        background: '#0f0f23',
        foreground: '#e2e8f0',
        primary: '#8b5cf6',
        primaryForeground: '#fafafa',
        secondary: '#1e1b4b',
        secondaryForeground: '#e2e8f0',
        accent: '#06b6d4',
        accentForeground: '#fafafa',
        muted: '#1e293b',
        mutedForeground: '#94a3b8',
        border: '#334155',
        card: '#1e1b4b',
        cardForeground: '#e2e8f0',
        destructive: '#f43f5e',
        destructiveForeground: '#fafafa',
        success: '#10b981',
        successForeground: '#fafafa',
    },
};

export const themeLabels: Record<ThemeType, { en: string; tr: string }> = {
    light: { en: 'Light', tr: 'Açık' },
    dark: { en: 'Dark', tr: 'Koyu' },
    color: { en: 'Colorful', tr: 'Renkli' },
};

export const generateCSSVariables = (theme: ThemeType): string => {
    const colors = themes[theme];
    return Object.entries(colors)
        .map(([key, value]) => {
            const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            return `--${cssKey}: ${value};`;
        })
        .join('\n  ');
};

export const getThemeClass = (theme: ThemeType): string => {
    return `theme-${theme}`;
};

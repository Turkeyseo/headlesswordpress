'use client';

import { ThemeColors } from '@/lib/config-types';

export default function ThemeInjector({ colors }: { colors?: ThemeColors }) {
    if (!colors) return null;

    const cssVariables = `
        :root {
            --background: ${colors.background};
            --foreground: ${colors.foreground};
            --primary: ${colors.primary};
            --primary-foreground: ${colors.primaryForeground};
            --secondary: ${colors.secondary};
            --secondary-foreground: ${colors.secondaryForeground};
            --accent: ${colors.accent};
            --accent-foreground: ${colors.accentForeground};
            --muted: ${colors.muted};
            --border: ${colors.border};
            --card: ${colors.card};
            --card-foreground: ${colors.foreground};
            --muted-foreground: ${colors.secondaryForeground};
        }
    `;

    return (
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
    );
}

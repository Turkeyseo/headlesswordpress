import { NextResponse } from 'next/server';
import { getSiteConfig } from '@/lib/config';
import { testConnection } from '@/lib/wordpress';

// Health check endpoint
export async function GET() {
    const config = getSiteConfig();

    let wpStatus = 'not_configured';
    let wpMessage = 'WordPress URL not configured';

    if (config.wordpressUrl) {
        try {
            const result = await testConnection(config.wordpressUrl);
            wpStatus = result.success ? 'connected' : 'error';
            wpMessage = result.message;
        } catch (error) {
            wpStatus = 'error';
            wpMessage = error instanceof Error ? error.message : 'Connection failed';
        }
    }

    return NextResponse.json({
        status: 'ok',
        timestamp: Date.now(),
        installed: config.installed,
        wordpress: {
            status: wpStatus,
            message: wpMessage,
            url: config.wordpressUrl || null,
        },
        config: {
            homeTemplate: config.homeTemplate,
            language: config.language,
        },
    });
}

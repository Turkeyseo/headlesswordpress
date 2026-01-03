import { NextResponse } from 'next/server';
import { checkForUpdates, performUpdate, getCurrentVersion } from '@/lib/updater';
import { cookies } from 'next/headers';
import { getSiteConfig } from '@/lib/config';

// Check for updates
export async function GET() {
    try {
        const updateInfo = await checkForUpdates();
        const currentInfo = getCurrentVersion();

        return NextResponse.json({
            ...updateInfo,
            currentInfo,
            timestamp: Date.now()
        });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to check updates' },
            { status: 500 }
        );
    }
}

// Perform update
export async function POST(request: Request) {
    try {
        // Verify authentication
        const config = getSiteConfig();
        if (config.auth) {
            const cookieStore = await cookies();
            const hasSession = cookieStore.has('manager_session');
            if (!hasSession) {
                return NextResponse.json(
                    { error: 'Unauthorized' },
                    { status: 401 }
                );
            }
        }

        const body = await request.json().catch(() => ({}));
        const { confirm } = body;

        if (!confirm) {
            return NextResponse.json(
                { error: 'Update must be confirmed', requireConfirmation: true },
                { status: 400 }
            );
        }

        const result = await performUpdate();

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Update failed'
            },
            { status: 500 }
        );
    }
}

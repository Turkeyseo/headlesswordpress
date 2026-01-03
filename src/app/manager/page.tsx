import { getSiteConfig } from '@/lib/config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function ManagerPage() {
    const config = getSiteConfig();

    // Check Auth
    if (config.auth) {
        const cookieStore = await cookies();
        const hasSession = cookieStore.has('manager_session');

        if (!hasSession) {
            redirect('/manager/login');
        }
    }

    return <DashboardClient />;
}

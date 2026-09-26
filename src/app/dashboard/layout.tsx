import type { ReactNode } from 'react';
import { requireUser } from '@/lib/auth';
import { AppShell } from '@/components/layout/app-shell';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const user = await requireUser();
    const metadata = user.user_metadata as { full_name?: string; name?: string } | undefined;
    const userName = metadata?.full_name ?? metadata?.name ?? user.email?.split('@')[0] ?? 'Counsel';
    return <AppShell userName={userName} userEmail={user.email ?? ''}>{children}</AppShell>;
}

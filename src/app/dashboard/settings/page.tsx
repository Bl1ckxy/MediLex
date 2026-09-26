import { requireUser } from '@/lib/auth';
import { SettingsForm } from '@/components/settings/settings-form';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    const user = await requireUser();
    const metadata = user.user_metadata as { full_name?: string; name?: string } | undefined;
    const name = metadata?.full_name ?? metadata?.name ?? user.email?.split('@')[0] ?? 'Counsel';
    return <SettingsForm userName={name} email={user.email ?? ''} />;
}

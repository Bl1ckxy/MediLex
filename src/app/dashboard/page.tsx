import { requireUser } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { getMockCases } from '@/mock';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const user = await requireUser();
    const supabase = createSupabaseServerClient();
    const { data: profile } = await (supabase as any).from('users').select('full_name').eq('auth_id', user.id).maybeSingle();
    const { data: cases } = await (supabase as any).from('cases').select('id,case_number,patient_name,hospital_name,status,claim_amount,limitation_deadline,created_at').order('created_at', { ascending: false }).limit(8);
    const hasRealData = cases && cases.length > 0;
    const displayCases = hasRealData ? cases : getMockCases().map((c: any) => ({
        id: c.id,
        case_number: c.case_number,
        patient_name: c.patient_name,
        hospital_name: c.hospital_name,
        status: c.status,
        claim_amount: c.claim_amount,
        limitation_deadline: c.limitation_deadline,
        created_at: c.created_at,
    })).slice(0, 8);
    return <DashboardOverview cases={displayCases} userName={profile?.full_name ?? user.email ?? 'Counsel'} />;
}

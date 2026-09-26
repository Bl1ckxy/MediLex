import { apiError, apiSuccess } from '@/lib/api';
import { getProfile } from '@/lib/server-user';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

export async function DELETE(_: Request, { params }: { params: { documentId: string } }) {
    const { supabase, authUser, profile } = await getProfile();
    if (!authUser || !profile) return apiError(401, 'UNAUTHORIZED', 'Authentication required');
    const { data: document, error: lookupError } = await (supabase as any).from('documents').select('id,storage_path,case_id,cases!inner(firm_id)').eq('id', params.documentId).eq('cases.firm_id', profile.firm_id ?? profile.id).single();
    if (lookupError || !document) return apiError(404, 'NOT_FOUND', 'Document not found');
    const admin = createSupabaseAdminClient();
    const { error: storageError } = await admin.storage.from('case-documents').remove([document.storage_path]);
    if (storageError) return apiError(500, 'INTERNAL_ERROR', storageError.message);
    const { error } = await (admin as any).from('documents').delete().eq('id', params.documentId);
    if (error) return apiError(500, 'INTERNAL_ERROR', error.message);
    return apiSuccess({ id: params.documentId });
}

export async function GET(_: Request, { params }: { params: { documentId: string } }) {
    const { supabase, authUser, profile } = await getProfile();
    if (!authUser || !profile) return apiError(401, 'UNAUTHORIZED', 'Authentication required');
    const { data, error } = await (supabase as any).from('documents').select('*,cases!inner(firm_id)').eq('id', params.documentId).eq('cases.firm_id', profile.firm_id ?? profile.id).single();
    if (error || !data) return apiError(404, 'NOT_FOUND', 'Document not found');
    const { data: signed, error: signedError } = await supabase.storage.from('case-documents').createSignedUrl(data.storage_path, 300);
    if (signedError) return apiError(500, 'INTERNAL_ERROR', signedError.message);
    return apiSuccess({ ...data, downloadUrl: signed.signedUrl });
}

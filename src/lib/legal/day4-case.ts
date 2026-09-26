export async function getCaseMaterial(supabase: any, caseId: string, firmId: string) {
    const { data: caseData, error } = await supabase
        .from('cases')
        .select('*, documents(id, category, file_name, ocr_status, ocr_text)')
        .eq('id', caseId)
        .eq('firm_id', firmId)
        .single();
    if (error || !caseData) return null;
    return caseData;
}

import { NextResponse } from 'next/server';
import type { ApiError, ErrorCode } from '@/types/api';

export function apiError(status: number, code: ErrorCode, message: string, details?: unknown) {
    const error: ApiError = { code, message, ...(details === undefined ? {} : { details }) };
    return NextResponse.json({ success: false, error }, { status });
}

export function apiSuccess<T>(data: T, status = 200) {
    return NextResponse.json({ success: true, data }, { status });
}

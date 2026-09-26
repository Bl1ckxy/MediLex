import { addYears, differenceInCalendarDays, differenceInDays, isBefore, startOfDay } from 'date-fns';

export interface LimitationResult {
    deadline: Date;
    daysRemaining: number;
    isExpired: boolean;
    isWarningZone: boolean;
    isCriticalZone: boolean;
    condonationPossible: boolean;
}

export function calculateLimitationDeadline(incidentDate: Date | string): Date {
    return addYears(typeof incidentDate === 'string' ? new Date(incidentDate) : incidentDate, 2);
}
export function isWithinLimitation(incidentDate: Date | string, asOf = new Date()): boolean {
    return !isBefore(calculateLimitationDeadline(incidentDate), startOfDay(asOf));
}
export function daysUntilLimitation(incidentDate: Date | string, asOf = new Date()): number {
    return differenceInCalendarDays(calculateLimitationDeadline(incidentDate), startOfDay(asOf));
}

export function computeLimitation(incidentDate: Date): LimitationResult {
    const deadline = addYears(incidentDate, 2);
    const daysRemaining = differenceInDays(deadline, new Date());
    return {
        deadline,
        daysRemaining,
        isExpired: daysRemaining < 0,
        isWarningZone: daysRemaining >= 0 && daysRemaining <= 90,
        isCriticalZone: daysRemaining >= 0 && daysRemaining <= 30,
        condonationPossible: daysRemaining < 0 && daysRemaining > -365,
    };
}

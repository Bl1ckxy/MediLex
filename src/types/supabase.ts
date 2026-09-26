export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    public: {
        Tables: {
            users: {
                Row: Record<string, unknown>;
                Insert: Record<string, unknown>;
                Update: Record<string, unknown>;
                Relationships: [];
            };
            cases: {
                Row: Record<string, unknown>;
                Insert: Record<string, unknown>;
                Update: Record<string, unknown>;
                Relationships: [];
            };
            documents: {
                Row: Record<string, unknown>;
                Insert: Record<string, unknown>;
                Update: Record<string, unknown>;
                Relationships: [];
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, string>;
        CompositeTypes: Record<string, never>;
    };
};

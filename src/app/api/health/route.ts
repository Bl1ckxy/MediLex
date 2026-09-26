import { createClient } from "@supabase/supabase-js";
import { apiError, apiSuccess } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      return apiError(503, "INTERNAL_ERROR", "Supabase health check is not configured", {
        service: "medilex",
        db: "down",
      });
    }

    const supabase = createClient(url, key);
    const { error } = await supabase.from("cases").select("id").limit(1);

    if (error) {
      return apiError(503, "INTERNAL_ERROR", "Supabase cases ping failed", {
        service: "medilex",
        db: "down",
      });
    }

    return apiSuccess({
      service: "medilex",
      db: "up",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return apiError(503, "INTERNAL_ERROR", "Supabase cases ping failed", {
      service: "medilex",
      db: "down",
    });
  }
}
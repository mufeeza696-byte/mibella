// ============================================================
// Refine.dev Data Provider Configuration with Supabase
// ============================================================

import { dataProvider } from "@refinedev/supabase";
import { createClient } from "@/lib/supabase/client";

export const supabaseClient = createClient();

// Refine data provider connected to MIBELLA Supabase database
export const refineDataProvider = dataProvider(supabaseClient);

// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://uyonxgipxpyyolvadnoi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b254Z2lweHB5eW9sdmFkbm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MzUwODEsImV4cCI6MjA2MDExMTA4MX0.ksrg-ITxXXjVhlJpgEzmP_JO0zCeB_HHA_FGIa1sA9k";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

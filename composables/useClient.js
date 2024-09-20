import { createClient } from "@supabase/supabase-js";

export const useClient = () => {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.supabaseUrl;
  const supabaseKey = config.public.supabaseKey;

  const supabase = createClient(supabaseUrl, supabaseKey);

  return {
    supabase,
  };
};

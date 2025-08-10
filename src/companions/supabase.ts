import {createClient} from "@supabase/supabase-js";

export const createSupabaseClient = () => {
    return createClient(
        import.meta.env.VITE_SUPABASE_URL || '',
        import.meta.env.VITE_SUPABASE_ANON_KEY || '', {
            async accessToken() {
                // Mock token - replace with actual auth implementation
                return 'mock-token';
            }
        }
    )
}
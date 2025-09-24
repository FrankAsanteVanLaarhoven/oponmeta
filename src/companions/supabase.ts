import {createClient} from "@supabase/supabase-js";

export const createSupabaseClient = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    // Check if environment variables are properly set
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase environment variables are not set. Using mock client.');
        // Return a mock client for development
        return createClient(
            'https://mock.supabase.co',
            'mock-anon-key',
            {
                auth: {
                    persistSession: false,
                    autoRefreshToken: false,
                    detectSessionInUrl: false
                }
            }
        );
    }
    
    return createClient(supabaseUrl, supabaseAnonKey, {
        async accessToken() {
            // Mock token - replace with actual auth implementation
            return 'mock-token';
        }
    });
}
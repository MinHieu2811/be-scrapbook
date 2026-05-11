import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (_supabase) return _supabase;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.',
    );
  }

  // Custom fetch with timeout and retry logic
  // Use 'any' or built-in fetch signature types since DOM typings aren't strictly loaded
  const customFetch = async (url: string | URL | globalThis.Request, options?: RequestInit): Promise<Response> => {
    const MAX_RETRIES = 3;
    const TIMEOUT_MS = 10000; // 10 seconds

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        clearTimeout(id);

        // Only retry on 5xx errors or 429 Too Many Requests
        if (!response.ok && (response.status >= 500 || response.status === 429)) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        return response;
      } catch (err) {
        clearTimeout(id);
        const isLastAttempt = attempt === MAX_RETRIES - 1;
        if (isLastAttempt) {
          throw err;
        }
        // Exponential backoff: 500ms, 1000ms
        const delay = Math.pow(2, attempt) * 500;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
    throw new Error('Unreachable'); // TS compiler fallback
  };

  _supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      fetch: customFetch,
    },
  });
  return _supabase;
}

// Convenience default export for backwards compatibility
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return getSupabaseClient()[prop as keyof SupabaseClient];
  },
});

// LocalStorage tabanlı mock client
// Supabase bağımlılığı tamamen kaldırıldı

export const supabase = null;
export const isSupabaseEnabled = false;

// Mock client for backward compatibility
export const mockSupabaseClient = {
  from: (table: string) => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: [], error: null }),
    update: () => ({ data: [], error: null }),
    delete: () => ({ data: [], error: null }),
    upsert: () => ({ data: [], error: null })
  }),
  auth: {
    getUser: () => ({ data: { user: null }, error: null }),
    signInWithPassword: () => ({ data: null, error: null }),
    signOut: () => ({ error: null })
  },
  storage: {
    from: () => ({
      upload: () => ({ data: null, error: null }),
      download: () => ({ data: null, error: null }),
      remove: () => ({ data: null, error: null })
    })
  }
};

console.log('📦 LocalStorage-only mode: Supabase dependencies removed');
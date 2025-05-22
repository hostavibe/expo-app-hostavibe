import { useEnvironment } from '@/src/hooks/useEnvironment';
import { useAuth } from '@clerk/clerk-expo';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as React from 'react';
import { createContext, useContext } from 'react';


type UserContextType = {
  supabase: SupabaseClient;
  isUserLoaded: boolean;
};


const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

  const { getToken, isLoaded } = useAuth();
  const env = useEnvironment();
  
  const supabaseUrl = env.supabaseUrl
  const supabaseAnonKey = env.supabaseAnonKey

  console.log("ENV", env)

  const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      async accessToken() {
        return await getToken();
      },
      auth: {
        // storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      }
    },
  )

  const value = { supabase, isUserLoaded: isLoaded };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

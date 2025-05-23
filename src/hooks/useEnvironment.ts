
interface Environment {
  envName: string;
  clerkExpoPublishableKey: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
}


export const useEnvironment = (): Environment => {

  const envName = process.env.EXPO_PUBLIC_ENV_NAME;
  const clerkExpoPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  const envVariables = {
    envName,
    clerkExpoPublishableKey,
    supabaseUrl,
    supabaseAnonKey,
  } as Environment;

  
  return envVariables;
};

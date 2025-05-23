
interface Environment {
  clerkExpoPublishableKey: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
}


export const useEnvironment = (): Environment => {

  const clerkExpoPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  const envVariables = {
    clerkExpoPublishableKey,
    supabaseUrl,
    supabaseAnonKey,
  } as Environment;

  console.log("envVariables", envVariables)
  
  return envVariables;
};

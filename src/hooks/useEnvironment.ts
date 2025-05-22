// hooks/useEnvironment.ts
import Constants from 'expo-constants';


interface Environment {
  clerkExpoPublishableKey: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
}


export const useEnvironment = (): Environment => {

  console.log("Constants.expoConfig", Constants.expoConfig)

  const envVariables = {
    ...Constants.expoConfig?.extra
  } as Environment;

  console.log("envVariables", envVariables)
  
  return envVariables;
};

import { config } from 'dotenv';
import { ConfigContext, ExpoConfig } from 'expo/config';
import path from 'path';

// Load environment variables
config(); // Load .env

const envName = process.env.ENV_NAME;
console.log("envName", envName);
const envPath = path.resolve(process.cwd(), `.env.${envName}`);
console.log("envPath", envPath);

config({ path: envPath, override: true });

const AppConfig = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'expo-app-hostavibe',
  slug: 'expo-app-hostavibe',
  extra: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    clerkExpoPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
});

console.log("AppConfig", AppConfig);
console.log("SUPABASE_URL", process.env.SUPABASE_URL);
console.log("SUPABASE_ANON_KEY", process.env.SUPABASE_ANON_KEY);
console.log("EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY", process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default AppConfig;

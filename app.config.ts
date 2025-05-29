import { config } from 'dotenv';
import { ConfigContext, ExpoConfig } from 'expo/config';
import path from 'path';

// Load environment variables
config(); // Load .env

const envFile = process.env.ENV_FILE;
console.log("envFile", envFile);
const envPath = path.resolve(process.cwd(), `.${envFile}`);
console.log("envPath", envPath);

config({ path: envPath, override: true });

const AppConfig = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'expo-app-hostavibe',
  slug: 'expo-app-hostavibe',
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    clerkExpoPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  web: {
    bundler: 'metro',
    output: 'single',
    favicon: './assets/favicon.png',
    build: {
      babel: {
        include: ['@expo/vector-icons'],
      },
    },
    router: {
      baseUrl: '/expo-app-hostavibe',
    }
  },
});

export default AppConfig;

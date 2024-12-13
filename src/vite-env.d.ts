/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string
  readonly VITE_STRIPE_BASIC_PRICE_ID: string
  readonly VITE_STRIPE_PROFESSIONAL_PRICE_ID: string
  readonly VITE_STRIPE_ENTERPRISE_PRICE_ID: string
  readonly VITE_SCRAPINGBEE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
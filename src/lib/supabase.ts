import 'react-native-url-polyfill/auto'

import * as SecureStore from 'expo-secure-store'

import { createClient } from '@supabase/supabase-js'

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key)
  },
}

const supabaseUrl = "https://tordztzrlayornaognxg.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvcmR6dHpybGF5b3JuYW9nbnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0NDU4NDgsImV4cCI6MjAwOTAyMTg0OH0.bfn0iXT8LNFAvoG_MKatCQs4cRi45D_hv3dxMx14PIk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oodqjwmqlwbgznvjtkje.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZHFqd21xbHdiZ3pudmp0a2plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0Mjg2ODMsImV4cCI6MjA4OTAwNDY4M30.nIdKSAeyOFRv4v2G5uWAGEQ3yzw6hRrd7p2F1H7En9U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

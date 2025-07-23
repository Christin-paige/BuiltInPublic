// This file tests Row Level Security (RLS) policies for the profiles table in Supabase

import { describe, it, expect, vi } from 'vitest';
import { authedClient, unauthClient } from '../testClients';
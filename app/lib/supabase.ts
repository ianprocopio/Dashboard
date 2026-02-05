import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://epatzleslnuyznemmsei.supabase.co';
const supabaseKey = 'sb_publishable_63hNNRzV7KQ7MaXJCkqBAw_0l5JUxVq';

export const supabase = createClient(supabaseUrl, supabaseKey);
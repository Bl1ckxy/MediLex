import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const TEST_USER = {
  email: 'test-e2e@example.com',
  password: 'TestPass123!',
  full_name: 'Test User',
};

async function createTestUser() {
  console.log('Creating test user...');

  const { data, error } = await supabase.auth.admin.createUser({
    email: TEST_USER.email,
    password: TEST_USER.password,
    email_confirm: true,
    user_metadata: { full_name: TEST_USER.full_name },
  });

  if (error) {
    if (error.message.includes('already registered')) {
      console.log('User already exists, updating password...');
      const { data: users } = await supabase.auth.admin.listUsers();
      const existing = users.users.find(u => u.email === TEST_USER.email);
      if (existing) {
        const { error: updateError } = await supabase.auth.admin.updateUserById(existing.id, {
          password: TEST_USER.password,
          email_confirm: true,
        });
        if (updateError) throw updateError;
        console.log('Password updated for existing user');
      }
    } else {
      throw error;
    }
  } else {
    console.log('Test user created:', data.user?.email);
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('email', TEST_USER.email)
    .maybeSingle();

  if (!profile) {
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        auth_id: (await supabase.auth.admin.listUsers()).data.users.find(u => u.email === TEST_USER.email)?.id,
        email: TEST_USER.email,
        full_name: TEST_USER.full_name,
        role: 'associate',
      });
    if (profileError) console.warn('Profile creation warning:', profileError.message);
    else console.log('Profile created');
  } else {
    console.log('Profile already exists');
  }
}

createTestUser().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
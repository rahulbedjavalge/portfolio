import { supabase } from './lib/supabase';

async function testConnection() {
  try {
    const { data, error } = await supabase.from('test_table').select('*');
    if (error) throw error;
    console.log('Connection successful:', data);
  } catch (err) {
    console.error('Error connecting to Supabase:', err);
  }
}

testConnection();

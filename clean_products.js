import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: products } = await supabase.from('products').select('*');
  
  const invalidKeywords = ['adsct', 'download_code', 'qustionnaire', 'shein-right', 'inspo', 'Leads'];
  
  const toDelete = products.filter(p => {
    return invalidKeywords.some(kw => p.main_image.includes(kw)) || p.main_image.endsWith('.gif');
  });
  
  if (toDelete.length > 0) {
      console.log(`Deleting ${toDelete.length} invalid products...`);
      for (const p of toDelete) {
          await supabase.from('products').delete().eq('id', p.id);
          console.log('Deleted:', p.main_image);
      }
  } else {
      console.log('No invalid products found.');
  }
}

main().catch(console.error);

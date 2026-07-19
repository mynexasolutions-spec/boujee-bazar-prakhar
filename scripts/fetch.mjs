import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, category, image')
    .order('category');

  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Found ${data.length} products.`);
  const categories = new Set();
  data.forEach(p => categories.add(p.category));
  console.log('Categories:', Array.from(categories));
  console.log('Sample products:', data.slice(0, 10));
}

fetchProducts();

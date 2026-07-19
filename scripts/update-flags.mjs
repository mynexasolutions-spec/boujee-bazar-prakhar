import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: products } = await supabase.from('products').select('id, name').limit(8);
  
  if (!products || products.length === 0) {
    console.log('No products found');
    return;
  }

  for (let i = 0; i < products.length; i++) {
    const isNewArrival = i < 4; // First 4
    const isBestSeller = i >= 4 && i < 8; // Next 4

    await supabase.from('products').update({
      is_new_arrival: isNewArrival,
      is_best_seller: isBestSeller
    }).eq('id', products[i].id);

    console.log(`Updated ${products[i].name} - New: ${isNewArrival}, Best: ${isBestSeller}`);
  }
}

main();

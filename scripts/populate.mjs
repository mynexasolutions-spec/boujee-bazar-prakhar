import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const imageMap = {
  'Accessories': [
    'https://images.pexels.com/photos/3310695/pexels-photo-3310695.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'Anklets': [
    'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'Bracelets': [
    'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3734612/pexels-photo-3734612.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/285938/pexels-photo-285938.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'Earrings': [
    'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1721937/pexels-photo-1721937.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'Necklaces': [
    'https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/837265/pexels-photo-837265.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'Rings': [
    'https://images.pexels.com/photos/177332/pexels-photo-177332.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/5604176/pexels-photo-5604176.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'Stationery': [
    'https://images.pexels.com/photos/636243/pexels-photo-636243.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'Watches': [
    'https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]
};

async function updateProducts() {
  const { data: products, error } = await supabase.from('products').select('*');
  if (error) throw error;
  
  for (let p of products) {
    let images = imageMap[p.category] || imageMap['Necklaces'];
    let imgUrl = images[Math.floor(Math.random() * images.length)];
    
    console.log(`Updating ${p.name} (${p.category}) with image ${imgUrl}`);
    
    const { error: updateError } = await supabase
      .from('products')
      .update({ image: imgUrl })
      .eq('id', p.id);
      
    if (updateError) {
      console.error(`Failed to update ${p.name}:`, updateError);
    }
  }
  
  console.log('Finished updating products!');
}

updateProducts();

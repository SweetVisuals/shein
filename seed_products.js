import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
      console.log('Images dir not found');
      return;
  }
  
  const files = fs.readdirSync(imagesDir).filter(f => f.match(/\.(webp|png|jpg|jpeg|gif)$/i));
  console.log(`Found ${files.length} images.`);
  
  // Get a seller
  const { data: sellers } = await supabase.from('sellers').select('id').limit(1);
  const sellerId = sellers?.[0]?.id;
  
  // Get a category
  const { data: categories } = await supabase.from('categories').select('id').limit(1);
  const categoryId = categories?.[0]?.id;
  
  if (!sellerId || !categoryId) {
      console.log('No seller or category found');
      return;
  }

  const products = files.map((file, index) => {
    // Generate a generic title
    const adjectives = ["Trendy", "Elegant", "Casual", "Modern", "Classic", "Chic", "Comfortable", "Stylish"];
    const nouns = ["Top", "Dress", "Outfit", "Apparel", "Wear", "Collection", "Piece"];
    
    const adj = adjectives[index % adjectives.length];
    const noun = nouns[(index * 3) % nouns.length];
    
    return {
      title: `${adj} ${noun} ${index + 1}`,
      description: `A highly fashionable ${adj.toLowerCase()} ${noun.toLowerCase()} suitable for any occasion.`,
      seller_id: sellerId,
      category_id: categoryId,
      base_price: Math.floor(Math.random() * 40) + 10 + 0.99,
      original_price: Math.floor(Math.random() * 20) + 60 + 0.99,
      currency: 'GBP',
      main_image: `/images/${file}`,
      images: [`/images/${file}`],
      tags: ["New Arrival", "Trending"],
      sold_count: Math.floor(Math.random() * 500)
    };
  });
  
  // Insert in batches
  const batchSize = 50;
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    const { error } = await supabase.from('products').insert(batch);
    if (error) {
      console.error('Error inserting batch:', error);
    } else {
      console.log(`Inserted batch ${i / batchSize + 1}`);
    }
  }
  
  console.log('Done inserting products!');
}

main().catch(console.error);

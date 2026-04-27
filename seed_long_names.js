import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function generateLongName(index) {
  const brands = ["Lymera", "Zanzea", "Celmia", "Vonda", "Shein", "Romwe", "Dazy", "Motf"];
  const genders = ["Women", "Women's", "Girls"];
  const seasons = ["Summer", "Spring", "Fall Autumn", "Winter", "Spring Summer", "Autumn Winter"];
  const details = ["Notched V-Neck", "Round Neck", "Off Shoulder", "Long Sleeve", "Short Sleeve", "Sleeveless", "Button Decor", "Lace Up", "Ruffle Trim", "Pleated", "Floral Print", "Solid Color", "Striped"];
  const styles = ["Casual", "Elegant", "Vintage", "Boho", "Chic", "Basic", "Y2K", "Streetwear"];
  const items = ["T-Shirt Tops", "Maxi Dress", "Mini Dress", "Blouse Shirts", "Tank Tops", "Sweater Pullover", "Cardigan", "Wide Leg Pants", "Cargo Pants", "A-Line Skirt"];
  const occasions = ["Work Office", "Going Out", "Party", "Beach Vacation", "Daily Wear", "Holiday", "Clubwear", "Loungewear"];
  const festivals = ["Halloween", "Christmas", "Thanksgiving", "New Year", "Valentine's Day", "Easter"];

  const r = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return `${brands[index % brands.length]} ${r(genders)} ${r(seasons)} ${r(details)} ${r(details)} ${r(styles)} ${r(items)} ${r(seasons)} ${r(festivals)} ${r(occasions)} Occasion For ${r(genders)} ${r(occasions)} ${r(festivals)} Occasion`;
}

async function main() {
  // First delete old seeded products. My seeded products had titles starting with adjectives like "Trendy", "Elegant", etc.
  // Actually, let's just delete products with images that have 'imgi_' or match the old hex strings.
  // The easiest is just to delete all products that don't look like original data. The original products had real titles.
  // Let's delete all products since the user says "nah remove those". I will delete products that have 'imgi_' or are in /images/
  console.log("Cleaning up previous products...");
  const { data: allProds } = await supabase.from('products').select('*');
  for (const p of allProds) {
    if (p.main_image.startsWith('/images/')) {
        await supabase.from('products').delete().eq('id', p.id);
    }
  }

  const sourceDir = path.join(process.cwd(), 'src', 'images');
  const destDir = path.join(process.cwd(), 'public', 'images');
  
  if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
  }

  if (!fs.existsSync(sourceDir)) {
      console.log('src/images not found');
      return;
  }
  
  const files = fs.readdirSync(sourceDir).filter(f => f.match(/\.(webp|png|jpg|jpeg|gif)$/i));
  console.log(`Found ${files.length} new images.`);
  
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

  const products = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // Move file
    fs.renameSync(path.join(sourceDir, file), path.join(destDir, file));
    
    products.push({
      title: generateLongName(i),
      description: `High quality fashion item perfect for multiple occasions. Designed for comfort and style.`,
      seller_id: sellerId,
      category_id: categoryId,
      base_price: Math.floor(Math.random() * 40) + 10 + 0.99,
      original_price: Math.floor(Math.random() * 20) + 60 + 0.99,
      currency: 'GBP',
      main_image: `/images/${file}`,
      images: [`/images/${file}`],
      tags: ["New Arrival", "Trending"],
      sold_count: Math.floor(Math.random() * 500)
    });
  }
  
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

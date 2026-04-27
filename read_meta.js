import fs from 'fs';
import path from 'path';
import ExifReader from 'exifreader';

async function readMeta() {
  const dir = path.join(process.cwd(), 'src', 'images');
  const files = fs.readdirSync(dir);
  
  for (const file of files.slice(0, 10)) {
    const filePath = path.join(dir, file);
    if (!fs.statSync(filePath).isFile()) continue;
    
    try {
      const tags = await ExifReader.load(filePath);
      console.log(`--- ${file} ---`);
      
      // Look for Alt Text, Description, Title, etc.
      for (const [key, value] of Object.entries(tags)) {
        if (typeof value.description === 'string' && value.description.length > 0) {
            console.log(`${key}: ${value.description}`);
        } else if (typeof value.value === 'string' && value.value.length > 0) {
            console.log(`${key}: ${value.value}`);
        }
      }
    } catch (e) {
      console.log(`Error reading ${file}: ${e.message}`);
    }
  }
}

readMeta();

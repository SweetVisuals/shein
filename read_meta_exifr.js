import fs from 'fs';
import path from 'path';
import exifr from 'exifr';

async function readMeta() {
  const dir = path.join(process.cwd(), 'src', 'images');
  const files = fs.readdirSync(dir);
  
  for (const file of files.slice(0, 10)) {
    const filePath = path.join(dir, file);
    if (!fs.statSync(filePath).isFile()) continue;
    
    try {
      const output = await exifr.parse(filePath, true); // true to parse all tags
      console.log(`--- ${file} ---`);
      console.log(output);
    } catch (e) {
      console.log(`Error reading ${file}: ${e.message}`);
    }
  }
}

readMeta();

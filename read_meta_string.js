import fs from 'fs';
import path from 'path';
import exifr from 'exifr';

async function readMeta() {
  const dir = path.join(process.cwd(), 'src', 'images');
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (!fs.statSync(filePath).isFile()) continue;
    
    try {
      const output = await exifr.parse(filePath, { xmp: true, tiff: true, ifd0: true, exif: true, iptc: true });
      if (output) {
        let textFound = false;
        let texts = [];
        for (const [key, value] of Object.entries(output)) {
           if (typeof value === 'string' && value.includes(' ') && !value.includes('IEC') && !value.includes('Copyright') && key !== 'DeviceModelDesc' && key !== 'ViewingCondDesc' && key !== 'ProfileDescription' && key !== 'Technology' && key !== 'PrimaryPlatform' && key !== 'DeviceManufacturer' && key !== 'ProfileCreator' && key !== 'RenderingIntent') {
               textFound = true;
               texts.push(`${key}: ${value}`);
           }
        }
        if (textFound) {
           console.log(`--- ${file} ---`);
           console.log(texts.join(', '));
        }
      }
    } catch (e) {
      // ignore
    }
  }
}

readMeta();

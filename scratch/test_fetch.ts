import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env.local BEFORE importing lib/cms
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const parts = trimmed.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      process.env[key] = val;
    }
  });
  console.log('Loaded env keys:', Object.keys(process.env).filter(k => k.includes('FIREBASE')));
} else {
  console.error('.env.local file not found!');
  process.exit(1);
}

async function test() {
  // Dynamically require lib/cms so env variables are initialized first
  const { getCMSData } = require('../lib/cms');
  
  console.log('Testing Firestore fetch...');
  try {
    const data = await getCMSData();
    console.log('Homepage Settings Hero Title:', data.homepageSettings?.heroTitle);
    if (!data.homepageSettings?.heroTitle) {
      console.log('⚠️ WARNING: Returned data is empty. Fetch failed or document not found.');
    } else {
      console.log('🔥 SUCCESS: Successfully fetched data from Firestore!');
    }
  } catch (err) {
    console.error('❌ Error during fetch:', err);
  }
}

test();

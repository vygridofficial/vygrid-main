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
} else {
  console.error('.env.local file not found!');
  process.exit(1);
}

async function test() {
  const { getCMSData, saveCMSData } = require('../lib/cms');
  
  console.log('Fetching master data...');
  try {
    const data = await getCMSData();
    console.log('Current adminPassword in Firestore:', data.generalSettings?.adminPassword);
    
    // Update password
    const updatedSettings = {
      ...data.generalSettings,
      adminPassword: "vygrid-2026"
    };
    
    console.log('Updating adminPassword to "vygrid-2026"...');
    const success = await saveCMSData({ generalSettings: updatedSettings });
    if (success) {
      console.log('🔥 SUCCESS: adminPassword updated to "vygrid-2026" in Firestore!');
    } else {
      console.log('❌ FAILED to update database document.');
    }
  } catch (err) {
    console.error('❌ Error updating password:', err);
  }
}

test();

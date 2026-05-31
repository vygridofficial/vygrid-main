const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Load environment variables from .env.local
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
  console.log('Environment loaded from .env.local');
} else {
  console.error('.env.local file not found!');
  process.exit(1);
}

// Check configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('Missing required Firebase environment variables in .env.local!');
  process.exit(1);
}

console.log('Initializing Firebase app for project:', firebaseConfig.projectId);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load master data JSON
const dataPath = path.join(__dirname, 'master_data.json');
if (!fs.existsSync(dataPath)) {
  console.error('master_data.json not found! Run dump_data first.');
  process.exit(1);
}

const masterData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

async function seed() {
  console.log('Uploading default master data to Firestore collection "cms_core", document "master_data"...');
  
  try {
    const docRef = doc(db, 'cms_core', 'master_data');
    await setDoc(docRef, masterData);
    console.log('🔥 SUCCESS: Firebase Firestore has been seeded with default CMS master data!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Firestore seeding error:', error);
    process.exit(1);
  }
}

seed();

import { db } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs, addDoc } from 'firebase/firestore';

export interface CMSData {
  homepageSettings: {
    heroTitle: string;
    heroSubtitle: string;
    heroPrimaryBtn: string;
    heroPrimaryBtnHref: string;
    heroSecondaryBtn: string;
    heroSecondaryBtnHref: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButtonText: string;
    ctaButtonHref: string;
    ctaImage?: string;
  };
  aboutPageSettings: {
    title: string;
    subtitle: string;
    introHeading: string;
    introParagraph1: string;
    introParagraph2: string;
  };
  contactSettings: {
    email: string;
    phone: string;
    address: string;
    whatsapp: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    lat: number;
    lng: number;
  };
  generalSettings: {
    logoUrl: string;
    faviconUrl: string;
    companyName: string;
    companyReg: string;
  };
  seoSettings: Record<string, { title: string; description: string }>;
  navigationSettings: {
    navLinks: Array<{ name: string; href: string; triggerModal?: boolean }>;
  };
  footerSettings: {
    tagline: string;
    directoryLinks: Array<{ name: string; href: string }>;
  };
  stats: Array<{ label: string; value: string }>;
  projects: any[];
  team: any[];
  testimonials: any[];
  webServices: any[];
  brandServices: any[];
  webFAQs: any[];
  brandFAQs: any[];
  webPricingTiers: any[];
  brandPricingTiers: any[];
  blogPosts: any[];
  servicePricing?: any[];
  leads?: any[];
  activityLogs?: any[];
  pricingPageSettings?: {
    sectionLabel: string;
    heading: string;
    description: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
  };

}

// Get master CMS data from Firestore
export async function getCMSData(): Promise<CMSData> {
  if (!db) {
    console.warn("Firebase Firestore is not configured. Returning empty schema.");
    return {} as CMSData;
  }
  
  try {
    const docRef = doc(db, "cms_core", "master_data");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as CMSData;
    }
  } catch (error) {
    console.error("Firestore master fetch error:", error);
  }
  return {} as CMSData;
}

// Save master CMS data to Firestore
export async function saveCMSData(data: Partial<CMSData>): Promise<boolean> {
  if (!db) {
    console.error("Firebase Firestore is not configured. Cannot save.");
    return false;
  }
  
  try {
    const docRef = doc(db, "cms_core", "master_data");
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (error) {
    console.error("Firestore master save error:", error);
    return false;
  }
}

// Save Lead Submission directly to Firestore
export async function saveLead(leadData: {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<boolean> {
  const timestamp = new Date().toISOString();
  const id = Math.random().toString(36).substring(2, 9);
  const newLead = { id, ...leadData, status: 'New', createdAt: timestamp };

  if (db) {
    try {
      await addDoc(collection(db, "leads"), newLead);
      return true;
    } catch (error) {
      console.error("Firestore lead save error:", error);
      return false;
    }
  }
  return false;
}

// Fetch Leads from Firestore
export async function getLeads(): Promise<any[]> {
  if (db) {
    try {
      const querySnapshot = await getDocs(collection(db, "leads"));
      const leads: any[] = [];
      querySnapshot.forEach((doc) => {
        leads.push({ id: doc.id, ...doc.data() });
      });
      return leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error("Firestore leads fetch error:", error);
    }
  }
  return [];
}

// Update lead status in Firestore
export async function updateLeadStatus(leadId: string, newStatus: string): Promise<boolean> {
  if (db) {
    try {
      const ref = collection(db, "leads");
      const q = await getDocs(ref);
      let docRefId = "";
      q.forEach((doc) => {
        if (doc.data().id === leadId || doc.id === leadId) {
          docRefId = doc.id;
        }
      });
      if (docRefId) {
        const d = doc(db, "leads", docRefId);
        await setDoc(d, { status: newStatus }, { merge: true });
        return true;
      }
    } catch (error) {
      console.error("Firestore lead status update error:", error);
      return false;
    }
  }
  return false;
}

// Activity Logging directly in Firestore
export async function addActivityLog(action: string, adminUser: string = 'admin'): Promise<boolean> {
  const timestamp = new Date().toISOString();
  const id = Math.random().toString(36).substring(2, 9);
  const log = { id, action, user: adminUser, createdAt: timestamp };

  if (db) {
    try {
      await addDoc(collection(db, "activity_logs"), log);
      return true;
    } catch (error) {
      console.error("Firestore log save error:", error);
      return false;
    }
  }
  return false;
}

// Fetch Activity Logs from Firestore
export async function getActivityLogs(): Promise<any[]> {
  if (db) {
    try {
      const querySnapshot = await getDocs(collection(db, "activity_logs"));
      const logs: any[] = [];
      querySnapshot.forEach((doc) => {
        logs.push({ id: doc.id, ...doc.data() });
      });
      return logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error("Firestore logs fetch error:", error);
    }
  }
  return [];
}

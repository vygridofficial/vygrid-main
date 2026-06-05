"use server";

import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { 
  getCMSData, 
  saveCMSData, 
  updateLeadStatus, 
  addActivityLog, 
  getLeads, 
  getActivityLogs 
} from "@/lib/cms";
import { revalidatePath } from "next/cache";

// Force home page and subpages to update their data caches
function triggerRevalidation() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/services");
  revalidatePath("/portfolio");
  revalidatePath("/blog");
  revalidatePath("/pricing");
  revalidatePath("/contact");
  // Purge Next.js Router Cache for all Admin Dashboard subroutes to ensure instant refresh
  revalidatePath("/admin/dashboard", "layout");
}

// 1. Pages and Settings Editors
export async function updateHomepageSettings(data: any) {
  const result = await saveCMSData({ homepageSettings: data });
  if (result) {
    await addActivityLog("Updated homepage title and CTA text");
    triggerRevalidation();
  }
  return { success: result };
}

export async function updateAboutPageSettings(data: any) {
  const result = await saveCMSData({ aboutPageSettings: data });
  if (result) {
    await addActivityLog("Updated about page descriptions and core headers");
    triggerRevalidation();
  }
  return { success: result };
}

export async function updateContactSettings(data: any) {
  const result = await saveCMSData({ contactSettings: data });
  if (result) {
    await addActivityLog("Updated studio contact details and geo-coordinates");
    triggerRevalidation();
  }
  return { success: result };
}

export async function updateGeneralSettings(data: any) {
  const result = await saveCMSData({ generalSettings: data });
  if (result) {
    await addActivityLog("Updated general studio settings (branding & registry info)");
    triggerRevalidation();
  }
  return { success: result };
}

export async function updateSEOSettings(data: any) {
  const result = await saveCMSData({ seoSettings: data });
  if (result) {
    await addActivityLog("Updated search engine optimization (SEO) configurations");
    triggerRevalidation();
  }
  return { success: result };
}

export async function updateNavigationSettings(data: any) {
  const result = await saveCMSData({ navigationSettings: data });
  if (result) {
    await addActivityLog("Updated navigation links layout");
    triggerRevalidation();
  }
  return { success: result };
}

export async function updateFooterSettings(data: any) {
  const result = await saveCMSData({ footerSettings: data });
  if (result) {
    await addActivityLog("Updated footer contact and columns layouts");
    triggerRevalidation();
  }
  return { success: result };
}

export async function updateStatsSettings(data: any[]) {
  const result = await saveCMSData({ stats: data });
  if (result) {
    await addActivityLog("Updated home page core delivery statistics");
    triggerRevalidation();
  }
  return { success: result };
}

// 2. Services CRUD
export async function saveService(service: any, isWeb: boolean) {
  const cmsData = await getCMSData();
  const listKey = isWeb ? "webServices" : "brandServices";
  const currentList = cmsData[listKey] || [];
  
  const existingIndex = currentList.findIndex((item: any) => item.title.toLowerCase() === service.title.toLowerCase());
  
  if (existingIndex > -1) {
    currentList[existingIndex] = service;
  } else {
    currentList.push(service);
  }
  
  const result = await saveCMSData({ [listKey]: currentList });
  if (result) {
    await addActivityLog(`Saved ${isWeb ? 'web' : 'brand'} service item: ${service.title}`);
    triggerRevalidation();
  }
  return { success: result };
}

export async function deleteService(title: string, isWeb: boolean) {
  const cmsData = await getCMSData();
  const listKey = isWeb ? "webServices" : "brandServices";
  const currentList = cmsData[listKey] || [];
  
  const filteredList = currentList.filter((item: any) => item.title !== title);
  const result = await saveCMSData({ [listKey]: filteredList });
  if (result) {
    await addActivityLog(`Deleted ${isWeb ? 'web' : 'brand'} service item: ${title}`);
    triggerRevalidation();
  }
  return { success: result };
}

export async function updateServicesOrder(newList: any[], isWeb: boolean) {
  const listKey = isWeb ? "webServices" : "brandServices";
  const result = await saveCMSData({ [listKey]: newList });
  if (result) {
    await addActivityLog(`Updated sequence order for ${isWeb ? 'web' : 'brand'} services`);
    triggerRevalidation();
  }
  return { success: result };
}

// 3. Projects CRUD
export async function saveProject(project: any) {
  const cmsData = await getCMSData();
  const currentList = cmsData.projects || [];
  
  const existingIdx = currentList.findIndex((p: any) => p.id === project.id);
  if (existingIdx > -1) {
    currentList[existingIdx] = project;
  } else {
    project.id = project.id || `project-${Date.now()}`;
    currentList.push(project);
  }
  
  const result = await saveCMSData({ projects: currentList });
  if (result) {
    await addActivityLog(`Saved case study project: ${project.title}`);
    triggerRevalidation();
  }
  return { success: result, project };
}

export async function deleteProject(projectId: string) {
  const cmsData = await getCMSData();
  const currentList = cmsData.projects || [];
  const project = currentList.find((p: any) => p.id === projectId);
  
  const filteredList = currentList.filter((p: any) => p.id !== projectId);
  const result = await saveCMSData({ projects: filteredList });
  if (result) {
    await addActivityLog(`Deleted case study project: ${project?.title || projectId}`);
    triggerRevalidation();
  }
  return { success: result };
}

export async function updateProjectsOrder(newList: any[]) {
  const result = await saveCMSData({ projects: newList });
  if (result) {
    await addActivityLog("Reordered projects display sequence");
    triggerRevalidation();
  }
  return { success: result };
}

// 4. Team CRUD
export async function saveTeamMember(member: any) {
  const cmsData = await getCMSData();
  const currentList = cmsData.team || [];
  
  const existingIdx = currentList.findIndex((m: any) => m.name.toLowerCase() === member.name.toLowerCase());
  if (existingIdx > -1) {
    currentList[existingIdx] = member;
  } else {
    currentList.push(member);
  }
  
  const result = await saveCMSData({ team: currentList });
  if (result) {
    await addActivityLog(`Saved team member: ${member.name}`);
    triggerRevalidation();
  }
  return { success: result };
}

export async function deleteTeamMember(name: string) {
  const cmsData = await getCMSData();
  const currentList = cmsData.team || [];
  
  const filteredList = currentList.filter((m: any) => m.name !== name);
  const result = await saveCMSData({ team: filteredList });
  if (result) {
    await addActivityLog(`Deleted team member: ${name}`);
    triggerRevalidation();
  }
  return { success: result };
}

export async function updateTeamOrder(newList: any[]) {
  const result = await saveCMSData({ team: newList });
  if (result) {
    await addActivityLog("Reordered team registry display sequence");
    triggerRevalidation();
  }
  return { success: result };
}

// 5. Testimonials CRUD
export async function saveTestimonial(testimonial: any) {
  const cmsData = await getCMSData();
  const currentList = cmsData.testimonials || [];
  
  const existingIdx = currentList.findIndex((t: any) => t.name.toLowerCase() === testimonial.name.toLowerCase());
  if (existingIdx > -1) {
    currentList[existingIdx] = { ...currentList[existingIdx], ...testimonial };
  } else {
    currentList.push(testimonial);
  }
  
  const result = await saveCMSData({ testimonials: currentList });
  if (result) {
    await addActivityLog(`Saved testimonial: ${testimonial.name} (${testimonial.company})`);
    triggerRevalidation();
  }
  return { success: result };
}

export async function submitClientReview(testimonial: any) {
  const cmsData = await getCMSData();
  const currentList = cmsData.testimonials || [];
  
  const newReview = {
    name: testimonial.name.trim(),
    role: testimonial.role.trim(),
    company: testimonial.company.trim(),
    stars: Number(testimonial.stars) || 5,
    avatar: testimonial.avatar ? testimonial.avatar.trim() : '',
    comment: testimonial.comment.trim(),
    approved: false,
    visible: false,
    createdAt: new Date().toISOString(),
  };

  const existingIdx = currentList.findIndex((t: any) => t.name.toLowerCase() === newReview.name.toLowerCase());
  if (existingIdx > -1) {
    currentList[existingIdx] = { ...currentList[existingIdx], ...newReview };
  } else {
    currentList.push(newReview);
  }

  const result = await saveCMSData({ testimonials: currentList });
  if (result) {
    await addActivityLog(`Client submitted a review request: ${newReview.name} (${newReview.company})`);
    triggerRevalidation();
  }
  return { success: result };
}

export async function deleteTestimonial(name: string) {
  const cmsData = await getCMSData();
  const currentList = cmsData.testimonials || [];
  
  const filteredList = currentList.filter((t: any) => t.name !== name);
  const result = await saveCMSData({ testimonials: filteredList });
  if (result) {
    await addActivityLog(`Deleted testimonial from: ${name}`);
    triggerRevalidation();
  }
  return { success: result };
}

// 6. FAQs CRUD
export async function saveFAQ(faq: any, isWeb: boolean) {
  const cmsData = await getCMSData();
  const listKey = isWeb ? "webFAQs" : "brandFAQs";
  const currentList = cmsData[listKey] || [];
  
  const existingIdx = currentList.findIndex((item: any) => item.q.toLowerCase() === faq.q.toLowerCase());
  if (existingIdx > -1) {
    currentList[existingIdx] = faq;
  } else {
    currentList.push(faq);
  }
  
  const result = await saveCMSData({ [listKey]: currentList });
  if (result) {
    await addActivityLog(`Saved ${isWeb ? 'web' : 'brand'} FAQ query: ${faq.q}`);
    triggerRevalidation();
  }
  return { success: result };
}

export async function deleteFAQ(q: string, isWeb: boolean) {
  const cmsData = await getCMSData();
  const listKey = isWeb ? "webFAQs" : "brandFAQs";
  const currentList = cmsData[listKey] || [];
  
  const filteredList = currentList.filter((item: any) => item.q !== q);
  const result = await saveCMSData({ [listKey]: filteredList });
  if (result) {
    await addActivityLog(`Deleted ${isWeb ? 'web' : 'brand'} FAQ query: ${q}`);
    triggerRevalidation();
  }
  return { success: result };
}

// 7. Pricing Tiers CRUD
export async function savePricingTier(tier: any, isWeb: boolean) {
  const cmsData = await getCMSData();
  const listKey = isWeb ? "webPricingTiers" : "brandPricingTiers";
  const currentList = cmsData[listKey] || [];
  
  const existingIdx = currentList.findIndex((item: any) => item.name.toLowerCase() === tier.name.toLowerCase());
  if (existingIdx > -1) {
    currentList[existingIdx] = tier;
  } else {
    currentList.push(tier);
  }
  
  const result = await saveCMSData({ [listKey]: currentList });
  if (result) {
    await addActivityLog(`Saved ${isWeb ? 'web' : 'brand'} pricing package: ${tier.name}`);
    triggerRevalidation();
  }
  return { success: result };
}

export async function deletePricingTier(name: string, isWeb: boolean) {
  const cmsData = await getCMSData();
  const listKey = isWeb ? "webPricingTiers" : "brandPricingTiers";
  const currentList = cmsData[listKey] || [];
  
  const filteredList = currentList.filter((item: any) => item.name !== name);
  const result = await saveCMSData({ [listKey]: filteredList });
  if (result) {
    await addActivityLog(`Deleted ${isWeb ? 'web' : 'brand'} pricing package: ${name}`);
    triggerRevalidation();
  }
  return { success: result };
}

// 8. Blog Posts CRUD
export async function saveBlogPost(post: any) {
  const cmsData = await getCMSData();
  const currentList = cmsData.blogPosts || [];
  
  const existingIdx = currentList.findIndex((p: any) => p.id === post.id);
  if (existingIdx > -1) {
    currentList[existingIdx] = post;
  } else {
    post.id = post.id || `blog-${Date.now()}`;
    currentList.push(post);
  }
  
  const result = await saveCMSData({ blogPosts: currentList });
  if (result) {
    await addActivityLog(`Saved journal article: ${post.title}`);
    triggerRevalidation();
  }
  return { success: result, post };
}

export async function deleteBlogPost(postId: string) {
  const cmsData = await getCMSData();
  const currentList = cmsData.blogPosts || [];
  const post = currentList.find((p: any) => p.id === postId);
  
  const filteredList = currentList.filter((p: any) => p.id !== postId);
  const result = await saveCMSData({ blogPosts: filteredList });
  if (result) {
    await addActivityLog(`Deleted journal article: ${post?.title || postId}`);
    triggerRevalidation();
  }
  return { success: result };
}

// 9. Lead status tracking
export async function modifyLeadStatus(leadId: string, status: string) {
  const result = await updateLeadStatus(leadId, status);
  if (result) {
    await addActivityLog(`Updated lead status of brief id ${leadId} to: ${status}`);
  }
  return { success: result };
}

// 10. Media Library Asset Uploader
export async function uploadMedia(fileName: string, base64Data: string) {
  try {
    // Robustly strip any data URI base64 prefix if present (e.g. image/svg+xml, application/octet-stream)
    const pureBase64 = base64Data.replace(/^data:[^;]+;base64,/, "");
    const buffer = Buffer.from(pureBase64, 'base64');

    // If Cloudinary environment variables are configured, upload to Cloudinary
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });

      const uploadResult = await new Promise<any>((resolve, reject) => {
        const ext = path.extname(fileName);
        const base = path.basename(fileName, ext);
        const cleanBase = base.replace(/[^a-zA-Z0-9-_]/g, '_');
        const publicId = `${cleanBase}-${Date.now()}`;
        const folder = process.env.CLOUDINARY_FOLDER || 'vygrid';

        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: folder,
            public_id: publicId,
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        uploadStream.write(buffer);
        uploadStream.end();
      });

      const publicUrl = uploadResult.secure_url;
      await addActivityLog(`Uploaded media file to Cloudinary: ${uploadResult.public_id}`);
      return { success: true, url: publicUrl };
    }

    // Fallback: local file system upload
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Create unique filename to prevent overwrite
    const ext = path.extname(fileName);
    const base = path.basename(fileName, ext);
    const uniqueFileName = `${base}-${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, uniqueFileName);
    
    fs.writeFileSync(filePath, buffer);
    const publicUrl = `/uploads/${uniqueFileName}`;
    
    await addActivityLog(`Uploaded media file to library (fallback): ${uniqueFileName}`);
    return { success: true, url: publicUrl };
  } catch (error: any) {
    console.error("Error uploading media file:", error);
    return { success: false, error: error.message };
  }
}


// 7.5. Service Pricing CRUD
export async function saveServicePricing(item: any) {
  const cmsData = await getCMSData();
  const currentList = cmsData.servicePricing || [];
  
  const existingIdx = currentList.findIndex((p: any) => p.id === item.id);
  if (existingIdx > -1) {
    currentList[existingIdx] = item;
  } else {
    item.id = item.id || `pricing-${Date.now()}`;
    currentList.push(item);
  }
  
  const result = await saveCMSData({ servicePricing: currentList });
  if (result) {
    await addActivityLog(`Saved service pricing details for: ${item.serviceName}`);
    triggerRevalidation();
  }
  return { success: result };
}

export async function deleteServicePricing(id: string) {
  const cmsData = await getCMSData();
  const currentList = cmsData.servicePricing || [];
  
  const filteredList = currentList.filter((p: any) => p.id !== id);
  const result = await saveCMSData({ servicePricing: filteredList });
  if (result) {
    await addActivityLog(`Deleted service pricing item id: ${id}`);
    triggerRevalidation();
  }
  return { success: result };
}

export async function updateServicePricingOrder(newList: any[]) {
  const result = await saveCMSData({ servicePricing: newList });
  if (result) {
    await addActivityLog("Reordered service pricing items display sequence");
    triggerRevalidation();
  }
  return { success: result };
}

export async function migrateServicePricingCurrency() {
  const cmsData = await getCMSData();
  const list: any[] = cmsData.servicePricing || [];
  const needsMigration = list.some((item) => (item.priceRange || '').includes('$'));
  if (!needsMigration) return { success: true, migrated: 0 };
  const migrated = list.map((item) => ({
    ...item,
    priceRange: (item.priceRange || '').replace(/\$/g, '₹'),
  }));
  const result = await saveCMSData({ servicePricing: migrated });
  if (result) {
    await addActivityLog('Auto-migrated service pricing currency from $ to ₹');
    triggerRevalidation();
  }
  return { success: result, migrated: migrated.length };
}

// 11. Fetch helpers (directly calling cms.ts library)
export async function fetchLeads() {
  return await getLeads();
}

export async function fetchActivityLogs() {
  return await getActivityLogs();
}

export async function fetchCMSData() {
  return await getCMSData();
}

export async function savePricingPageSettings(settings: {
  sectionLabel: string;
  heading: string;
  description: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
}) {
  const result = await saveCMSData({ pricingPageSettings: settings });
  if (result) {
    await addActivityLog('Updated pricing page text settings');
    triggerRevalidation();
  }
  return { success: result };
}

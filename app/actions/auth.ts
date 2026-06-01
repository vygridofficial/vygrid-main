"use server";

import { cookies } from "next/headers";
import { getCMSData, saveCMSData } from "@/lib/cms";

const DEFAULT_USER = "admin";
const DEFAULT_PASS = "vygrid-2026";
const SESSION_COOKIE = "vygrid_admin_session";
const SESSION_VALUE = "vygrid-active-session-token-2026";

export async function loginAdmin(formData: any) {
  const { password } = formData;
  
  const cmsData = await getCMSData();
  const settings = cmsData.generalSettings as any;
  
  const targetPass = settings?.adminPassword || DEFAULT_PASS;
  
  if (password === targetPass) {
    cookies().set(SESSION_COOKIE, SESSION_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "lax"
    });
    return { success: true };
  }
  
  return { success: false, error: "Invalid password. Access denied." };
}

export async function logoutAdmin() {
  cookies().delete(SESSION_COOKIE);
  return { success: true };
}

export async function checkSession() {
  const cookieStore = cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === SESSION_VALUE;
}

export async function updateAdminCredentials(username: string, currentPass: string, newPass: string) {
  const cmsData = await getCMSData();
  const settings = cmsData.generalSettings as any;
  
  const targetPass = settings?.adminPassword || DEFAULT_PASS;
  
  if (currentPass !== targetPass) {
    return { success: false, error: "Authentication failed. The current password entered is incorrect." };
  }
  
  const updatedSettings = {
    ...settings,
    adminUsername: username,
    adminPassword: newPass
  };
  
  const result = await saveCMSData({ generalSettings: updatedSettings });
  return { success: result };
}

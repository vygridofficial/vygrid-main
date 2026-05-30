"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { contactSchema, ContactFormData } from "@/lib/schemas";

export async function submitContactBrief(rawData: ContactFormData) {
  try {
    // 1. Validate payload server-side using Zod
    const validatedData = contactSchema.parse(rawData);

    // 2. Check if Firestore was successfully initialized
    if (!db) {
      return {
        success: false,
        error: "Firebase database is not configured. Please define the Firebase environment credentials in `.env.local` to enable Firestore submissions.",
      };
    }

    // 3. Write to Firestore under the 'inquiries' collection
    const docRef = await addDoc(collection(db, "inquiries"), {
      ...validatedData,
      createdAt: new Date().toISOString(),
    });

    console.log(`[Database] Submissions saved successfully. Firestore Doc ID: ${docRef.id}`);

    return {
      success: true,
      id: docRef.id,
    };
  } catch (error: unknown) {
    console.error("Error in submitContactBrief Server Action:", error);

    const isZodError = error && typeof error === 'object' && 'name' in error && error.name === 'ZodError';
    if (isZodError) {
      return {
        success: false,
        error: "Validation error: Form details failed server-side checks.",
      };
    }

    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during database transmission. Please try again.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

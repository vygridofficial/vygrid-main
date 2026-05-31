"use server";

import { contactSchema, ContactFormData } from "@/lib/schemas";
import { saveLead } from "@/lib/cms";

export async function submitContactBrief(rawData: ContactFormData) {
  try {
    // 1. Validate payload server-side using Zod
    const validatedData = contactSchema.parse(rawData);

    // 2. Save via dynamic CMS layer (Firestore with local fallback)
    const success = await saveLead({
      fullName: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone || undefined,
      message: validatedData.message
    });

    if (!success) {
      return {
        success: false,
        error: "Failed to transmit message. Database sync error.",
      };
    }

    return {
      success: true,
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

export async function submitIntakeBrief(data: {
  fullName: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  source?: string;
}) {
  try {
    const formattedMessage = `Company: ${data.company}
Project Type: ${data.projectType}
Budget Range: ${data.budget}
Timeline: ${data.timeline}
Referral Source: ${data.source || 'N/A'}

Project Brief / Description:
${data.description}`;

    const success = await saveLead({
      fullName: data.fullName,
      email: data.email,
      message: formattedMessage
    });

    if (!success) {
      return {
        success: false,
        error: "Failed to stage brief. Database sync error.",
      };
    }

    return {
      success: true,
    };
  } catch (error: unknown) {
    console.error("Error in submitIntakeBrief Server Action:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred. Please try again.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

import { eq, and, desc } from "drizzle-orm";
import { db } from "../config/database/turso";
import { testimonial, profile, user } from "../config/database/schema";



// Get all testimonials of a profile (owner only)
export const getProfileTestimonials = async (
  profileId: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const testimonials = await db
        .select({
          userDetails: testimonial.userDetails,
          rating: testimonial.rating,
          status: testimonial.status,
          comment: testimonial.comment
        })
        .from(testimonial)
        .where(eq(testimonial.profile_id, profileId))
        .orderBy(desc(testimonial.created_at));

      resolve(testimonials);
    } catch (error) {
      reject(error);
    }
  });
};



// Create a new testimonial
export const createTestimonial = async (
  profileId: string,
  userDetails: string,
  rating: number,
  comment: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Validate rating
      if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
      }

      const result = await db
        .insert(testimonial)
        .values({
          profile_id: profileId,
          userDetails,
          rating,
          comment,
          status: 0 // Default to inactive
        })
        .returning();

      resolve(result[0]);
    } catch (error) {
      reject(error);
    }
  });
};



// Update testimonial status (only for profile owner)
export const updateTestimonialStatus = async (
  testimonialId: string,
  profileId: string,
  status: number
) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Validate status
      if (status !== 0 && status !== 1) {
        throw new Error("Status must be 0 (inactive) or 1 (active)");
      }

      // First verify the testimonial belongs to the profile
      const existingTestimonial = await db
        .select()
        .from(testimonial)
        .where(
          and(
            eq(testimonial.id, testimonialId),
            eq(testimonial.profile_id, profileId)
          )
        )
        .limit(1);

      if (existingTestimonial.length === 0) {
        throw new Error("Testimonial not found or does not belong to this profile");
      }

      const result = await db
        .update(testimonial)
        .set({
          status,
          updated_at: new Date().toISOString()
        })
        .where(eq(testimonial.id, testimonialId))
        .returning();

      resolve(result[0]);
    } catch (error) {
      reject(error);
    }
  });
};

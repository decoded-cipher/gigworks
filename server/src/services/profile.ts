
import { count, eq, sql } from "drizzle-orm";
import { db } from "../config/database/turso";
import {
  user,
  profile,
  partner,
  profilePayment,
  profileMedia,
  profileTag,
  licenseType,
  profileLicense,
  category,
  subCategory,
  subCategoryOption,
  testimonial,
} from "../config/database/schema";
import { User, Profile, SubCategory } from "../config/database/interfaces";
import { removeFields } from "../utils/helpers";



// Create a new profile (business) for a user
export const createProfile = async (data: Profile) => {
  return new Promise(async (resolve, reject) => {
    try {
      // SQL Query : SELECT id FROM partner WHERE referral_code = data.referral_code

      let partnerData = null;
      if (data.referral_code) {
        partnerData = await db
          .select({
            id: partner.id,
          })
          .from(partner)
          .where(sql`${partner.referral_code} = ${data.referral_code}`);

        if (!partnerData.length) {
          reject(new Error("Invalid referral code"));
        }
      }

      // Check if profile slug exists
      let slugExists = await checkProfileSlug(data.slug);
      if (slugExists) {
        reject(
          new Error("Profile slug already exists. Please choose another slug")
        );
      }

      if (data.operating_hours) {
        data.operating_hours = JSON.stringify(data.operating_hours);
      }

      if (data.socials) {
        data.socials = JSON.stringify(data.socials);
      }

      if (data.additional_services) {
        data.additional_services = JSON.stringify(data.additional_services);
      }

      // SQL Query : INSERT INTO profile (name, slug, description, email, website, phone, gstin, category_id, sub_category_id, sub_category_option_id, address, city, state, zip, country, facebook, instagram, twitter, linkedin, youtube, logo, type, additional_services, referral_code, partner_id) VALUES (data.name, data.slug, data.description, data.email, data.website, data.phone, data.gstin, data.category_id, data.sub_category_id, data.sub_category_option_id, data.address, data.city, data.state, data.zip, data.country, data.facebook, data.instagram, data.twitter, data.linkedin, data.youtube, data.logo, data.type, data.additional_services, data.referral_code, partnerData[0].id)

      let result = await db
        .insert(profile)
        .values({
          ...data,
          partner_id: partnerData ? partnerData[0].id : null,
        })
        .returning();

      result = result[0];

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};



// Update a profile partially
export const updateProfile = async (id: string, data: Profile) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allowedFields = [
        "name",
        "slug",
        "description",
        "email",
        "phone",
        "category_id",
        "sub_category_id",
        "sub_category_option_id",
        "address",
        "city",
        "state",
        "zip",
        "country",
        "latitude",
        "longitude",
        "location_url",
        "operating_hours",
        "socials",
        "type",
        "additional_services",
        "gstin",
        "avatar",
        "banner",
      ];
      const dataKeys = Object.keys(data);

      for (let key of dataKeys) {
        if (!allowedFields.includes(key)) {
          delete data[key];
        }
      }

      if (data.operating_hours) {
        data.operating_hours = JSON.stringify(data.operating_hours);
      }

      if (data.socials) {
        data.socials = JSON.stringify(data.socials);
      }

      if (data.slug) {
        let slugExists = await checkProfileSlug(data.slug);
        if (slugExists) {
          reject(
            new Error("Profile slug already exists. Please choose another slug")
          );
        }
      }

      // SQL Query : UPDATE profile SET profile = profile WHERE id = id

      let result = await db
        .update(profile)
        .set(data)
        .where(sql`${profile.id} = ${id}`)
        .returning();

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};



// Get all profiles by category id with pagination
export const getProfilesByCategory = async (
  category_id: string | null | undefined,
  category_name: string | null | undefined,
  page: number,
  limit: number,
  search: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      /*
        SELECT 
            profile.name, 
            profile.slug, 
            profile.type, 
            profile.avatar, 
            profile.city 
        FROM 
            profile 
            LEFT JOIN category ON category.id = profile.category_id 
        WHERE 
            profile.category_id = category_id AND 
            profile.name LIKE %search% AND 
            profile.status = 1 AND 
            category.status = 1 
        ORDER BY 
            profile.name ASC 
        LIMIT 
            limit 
        OFFSET 
            (page - 1) * limit
    */

      // Build conditions array for dynamic WHERE clause
      const conditions = [
        sql`${profile.status} = 1`,
        sql`${category.status} = 1`
      ];

      if (category_id && category_id.trim() !== '') {
        conditions.push(sql`${profile.category_id} = ${category_id}`);
      }

      if (category_name && category_name.trim() !== '') {
        conditions.push(sql`${category.name} LIKE ${"%" + category_name + "%"}`);
      }

      if (search && search.trim() !== '') {
        conditions.push(sql`${profile.name} LIKE ${"%" + search + "%"}`);
      }

      let results = await db
        .select({
          name: profile.name,
          slug: profile.slug,
          type: profile.type,
          avatar: profile.avatar,
          location: profile.city,
        })
        .from(profile)
        .leftJoin(category, sql`${category.id} = ${profile.category_id}`)
        .where(sql.join(conditions, sql` AND `))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(profile.name, "ASC");

        // ${category_name ? sql`${category.name} = ${category_name}` : sql`TRUE`} AND
        // ${category_id ? sql`${profile.category_id} = ${category_id}` : sql`TRUE`} AND
        // ${search ? sql`${profile.name} LIKE ${"%" + search + "%"}` : sql`TRUE`} AND

      // Get count with same filters
      const countResult = await db
        .select({ count: sql`COUNT(*)` })
        .from(profile)
        .leftJoin(category, sql`${category.id} = ${profile.category_id}`)
        .where(sql.join(conditions, sql` AND `));

      resolve({
        data: results,
        count: countResult[0].count,
      });
    } catch (error) {
      reject(error);
    }
  });
};



// Get all profiles by user
export const getProfilesByUser = async (user_id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      // SQL Query : SELECT slug, name, avatar FROM profile WHERE user_id = user_id

      let results = await db
        .select({
          name: profile.name,
          slug: profile.slug,
          avatar: profile.avatar,
        })
        .from(profile)
        .where(sql`${profile.user_id} = ${user_id}`);

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};



// Check if profile exists
export const getProfileById = async (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      // SQL Query : SELECT * FROM profile WHERE id = id

      let result = await db
        .select()
        .from(profile)
        .where(sql`${profile.id} = ${id}`)
        .get();

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};



// Get total number of profiles (businesses)
export const getProfileCount = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      // SQL Query : SELECT COUNT(*) FROM profile

      const additionalCount = 1000;
      let result = await db
        .select({ count: sql`COUNT(*)` })
        .from(profile)
        .get();
      result = result.count + additionalCount;

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};



// Get all profiles with upcoming renewals
export const getRenewalProfiles = async (
  page: number,
  limit: number,
  days: number,
  search: string,
  category_id: string,
  status: number
) => {
  return new Promise(async (resolve, reject) => {
    try {
      /*
                SELECT 
                    profile.id, 
                    profile.name, 
                    user.name, 
                    user.phone, 
                    profile_payment.created_at, DATE(profile_payment.created_at, '+1 YEAR'), 
                    CAST((julianday(DATE(profile_payment.created_at, '+1 YEAR')) - julianday(CURRENT_TIMESTAMP)) AS INTEGER) 
                FROM 
                    profile 
                    LEFT JOIN user ON user.id = profile.user_id 
                    LEFT JOIN profile_payment ON profile_payment.profile_id = profile.id 
                WHERE 
                    julianday(DATE(profile_payment.created_at, '+1 YEAR')) - julianday(CURRENT_TIMESTAMP) < days
                ORDER BY 
                    profile_payment.created_at
                LIMIT
                    limit
                OFFSET
                    (page - 1) * limit
            */

      // First build the base conditions
      const conditions = [
        sql`julianday(DATETIME(${profilePayment.created_at}, '+1 YEAR')) - julianday(CURRENT_TIMESTAMP) < ${days}`,
      ];
      // Add search condition if provided

      if (search) {
        conditions.push(
          sql`(LOWER(${profile.name}) LIKE LOWER(${"%" + search + "%"}) OR LOWER(${user.name}) LIKE LOWER(${"%" + search + "%"}))`
        );
      }

      // Add category filter if provided
      if (category_id) {
        conditions.push(sql`${profile.category_id} = ${category_id}`);
      }

      // Add status filter if provided (0,1,2,3)
      if (status !== undefined) {
        conditions.push(sql`${profile.status} = ${status}`);
      }

      // Combine all conditions with AND
      const whereClause =
        conditions.length > 1
          ? sql.join(conditions, sql` AND `)
          : conditions[0];

      // Main query
      let results = await db
        .select({
          profileId: profile.id,
          profileName: profile.name,
          category: category.name,
          categoryId: category.id,
          subCategory: subCategory.name,
          subCategoryOption: subCategoryOption.name,
          avatar: profile.avatar,
          slug: profile.slug,
          owner: user.name,
          phone: user.phone,
          email: profile.email,
          lastPaymentStatus: profilePayment.payment_status,
          expiryDate: sql`DATETIME(${profilePayment.created_at}, '+1 YEAR')`,
          daysLeft: sql`CAST((julianday(DATETIME(${profilePayment.created_at}, '+1 YEAR')) - julianday(CURRENT_TIMESTAMP)) AS INTEGER)`,
          statusOrder: sql`CASE WHEN ${profilePayment.payment_status} = 'pending' THEN 1 ELSE 2 END`,
          status: profile.status,
        })
        .from(profile)
        .leftJoin(user, sql`${user.id} = ${profile.user_id}`)
        .leftJoin(
          profilePayment,
          sql`${profilePayment.profile_id} = ${profile.id}`
        )
        .leftJoin(category, sql`${category.id} = ${profile.category_id}`)
        .leftJoin(
          subCategory,
          sql`${subCategory.id} = ${profile.sub_category_id}`
        )
        .leftJoin(
          subCategoryOption,
          sql`${subCategoryOption.id} = ${profile.sub_category_option_id}`
        )
        .where(whereClause)
        .orderBy("statusOrder")
        .orderBy(profilePayment.created_at)
        .limit(limit)
        .offset((page - 1) * limit);

      // Count query
      const totalCount = await db
        .select({ count: sql`COUNT(*)` })
        .from(profile)
        .leftJoin(user, sql`${user.id} = ${profile.user_id}`)
        .leftJoin(
          profilePayment,
          sql`${profilePayment.profile_id} = ${profile.id}`
        )
        .where(whereClause);

      resolve({
        data: results,
        count: totalCount[0].count,
      });
    } catch (error) {
      reject(error);
    }
  });
};



// Check if profile slug exists
export const checkProfileSlug = async (slug: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      // SQL Query : SELECT * FROM profile WHERE slug = slug

      let result = await db
        .select()
        .from(profile)
        .where(sql`${profile.slug} = ${slug}`)
        .get();

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};



// Get profile by slug
export const getProfileBySlug = async (slug: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      /*
                SELECT 
                    profile.*, 
                    user.name, 
                    user.phone, 
                    category.name, 
                    sub_category.name 
                FROM 
                    profile 
                    INNER JOIN user ON user.id = profile.user_id 
                    LEFT JOIN profile_payment ON profile_payment.profile_id = profile.id 
                    LEFT JOIN category ON category.id = profile.category_id 
                    LEFT JOIN sub_category ON sub_category.id = profile.sub_category_id 
                WHERE 
                    profile.slug = slug AND 
                    profile.status = 1
            */

      let profileResult = await db
        .select({
          profile: profile,
          user: {
            name: user.name,
            phone: user.phone,
          },
          category: category.name,
          subCategory: subCategory.name,
          subCategoryOption: subCategoryOption.name,
        })
        .from(profile)
        .innerJoin(user, sql`${user.id} = ${profile.user_id}`)
        .leftJoin(category, sql`${category.id} = ${profile.category_id}`)
        .leftJoin(
          subCategory,
          sql`${subCategory.id} = ${profile.sub_category_id}`
        )
        .leftJoin(
          subCategoryOption,
          sql`${subCategoryOption.id} = ${profile.sub_category_option_id}`
        )
        .where(
          sql`
            ${profile.slug} = ${slug} AND ${profile.status} = 1
          `
        )
        .get();

      if (!profileResult) {
        resolve(null);
        return;
      }

      const [licenses, media, tags, testimonials] = await Promise.all([
        /*
          SELECT 
              license_type.name, 
              profile_license.license_number, 
              profile_license.license_url, 
              license_type.description 
          FROM 
              profile_license 
              LEFT JOIN license_type ON license_type.id = profile_license.license_type_id 
          WHERE 
              profile_license.profile_id = profileResult.profile.id
        */

        db
          .select({
            _id: profileLicense.id,
            name: licenseType.name,
            number: profileLicense.license_number,
            url: profileLicense.license_url,
            description: licenseType.description,
          })
          .from(profileLicense)
          .leftJoin(
            licenseType,
            sql`${licenseType.id} = ${profileLicense.license_type_id}`
          )
          .where(
            sql`${profileLicense.profile_id} = ${profileResult.profile.id}`
          )
          .all(),

        // SQL Query : SELECT * FROM profile_media WHERE profile_id = profileResult.profile.id

        db
          .select({
            id: profileMedia.id,
            url: profileMedia.url,
            description: profileMedia.description,
          })
          .from(profileMedia)
          .where(sql`${profileMedia.profile_id} = ${profileResult.profile.id}`)
          .all(),

        // SQL Query : SELECT * FROM profile_tag WHERE profile_id = profileResult.profile.id
        
        db
          .select()
          .from(profileTag)
          .where(sql`${profileTag.profile_id} = ${profileResult.profile.id}`)
          .all(),

        // SQL Query : SELECT * FROM testimonial WHERE profile_id = profileResult.profile.id
        
        db
          .select({
            userDetails: testimonial.userDetails,
            rating: testimonial.rating,
            comment: testimonial.comment
          })
          .from(testimonial)
          .where(sql`
            ${testimonial.profile_id} = ${profileResult.profile.id} AND 
            ${testimonial.status} = 1
          `)
          .all(),
      ]);

      let data = { ...profileResult, licenses, media, tags, testimonials };
      data.profile.operating_hours = JSON.parse(data.profile.operating_hours);
      data.profile.socials = JSON.parse(data.profile.socials);

      const fieldsToRemove = [
        "user_id",
        "category_id",
        "sub_category_id",
        "sub_category_option_id",
        "partner_id",
        "role",
        "updated_at",
        "created_at",
        "status",
      ];
      const result = removeFields(data, fieldsToRemove);

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};



// Update profile status (approve/reject)
export const updateProfileStatus = async (id: string, status: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const profileResult = await db
        .update(profile)
        .set({ status })
        .where(eq(profile.id, id));
      const paymentResult = await db
        .update(profilePayment)
        .set({ payment_status: "success" })
        .where(eq(profilePayment.profile_id, id));
      resolve(profileResult);
    } catch (error) {
      reject(error);
    }
  });
};



// Get all profiles by sub-category option
export const getProfilesBySubCategoryOption = async (
  sub_category_option_id: string,
  location: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log({
        sub_category_option_id,
        location,
      });

      /*
        SELECT 
            profile.name, 
            profile.slug, 
            user.name,
            user.phone,
            profile.city
        FROM 
            profile 
            LEFT JOIN sub_category_option ON sub_category_option.id = profile.sub_category_option_id 
            LEFT JOIN user ON user.id = profile.user_id
        WHERE 
            profile.sub_category_option_id = sub_category_option_id AND 
            profile.city LIKE %location% AND 
            profile.status = 1
      */

      let results = await db
        .select({
          name: profile.name,
          slug: profile.slug,
          city: profile.city,
          user: {
            name: user.name,
            phone: user.phone,
          },
        })
        .from(profile)
        .leftJoin(
          subCategoryOption,
          sql`${subCategoryOption.id} = ${profile.sub_category_option_id}`
        )
        .leftJoin(user, sql`${user.id} = ${profile.user_id}`)
        .where(
          sql`
            ${profile.sub_category_option_id} = ${sub_category_option_id} AND
            ${profile.status} = 1
          `
        )
        .all();

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};

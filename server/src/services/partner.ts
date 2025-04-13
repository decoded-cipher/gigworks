import { eachMonthOfInterval, format } from "date-fns";

import { count, eq, sql } from "drizzle-orm";
import { db } from "../config/database/turso";

import {
  user,
  profile,
  partner,
  partnerBank,
  partnerIdProof,
} from "../config/database/schema";

import {
  User,
  Partner,
  PartnerBank,
  PartnerIdProof,
  partnerIdProofTypes,
  User,
  PartnerBank,
} from "../config/database/interfaces";
import { secureText } from "../utils/helpers";



// Generate a unique referral code
const generateReferralCode = async (user: User): Promise<string> => {
  const prefix = `${user.name.substring(0, 2).toUpperCase()}${user.phone
    .substring(0, 2)
    .toUpperCase()}`;
  const suffix = user.phone.slice(-2).toUpperCase();

  for (let attempts = 0; attempts < 10; attempts++) {
    const randomPart = Math.random().toString(36).substring(2, 4).toUpperCase();
    const referralCode = `${prefix}${randomPart}${suffix}`;

    const result = await db
      .select()
      .from(partner)
      .where(sql`referral_code = ${referralCode}`);

    if (result.length === 0) {
      return referralCode;
    }
  }

  throw new Error("Unable to generate unique referral code");
};



// Create a new partner
export const createPartner = async (data: Partner, user: User) => {
  return new Promise(async (resolve, reject) => {
    try {
      // SQL Query : SELECT * FROM partner WHERE user_id = user.id

      const result = await db
        .select()
        .from(partner)
        .where(sql`user_id = ${user.id}`);

      if (result.length > 0) {
        resolve(null);
      }

      const referralCode = await generateReferralCode(user);

      // SQL Query : INSERT INTO partner (user_id, referral_code) VALUES (user.id, referralCode)

      const newPartner = await db
        .insert(partner)
        .values({
          ...data,
          user_id: user.id,
          referral_code: referralCode,
        })
        .returning();

      resolve(newPartner[0]);
    } catch (error) {
      reject(error);
    }
  });
};



// Update partner data
export const updatePartner = async (data: Partner) => {
  return new Promise(async (resolve, reject) => {
    try {
      // SQL Query : UPDATE partner SET name = $1, phone = $2, email = $3, updated_at = $4 WHERE id = $5 RETURNING *

      const result = await db
        .update(partner)
        .set({ ...data })
        .where(sql`id = ${data.id}`)
        .returning();

      resolve(result[0]);
    } catch (error) {
      reject(error);
    }
  });
};



// Get partner by user id
export const getPartnerById = async (userData: User) => {
  return new Promise(async (resolve, reject) => {
    try {
      /*
                SELECT
                    user.name,
                    user.phone,
                    user.email,
                    partner.referral_code,
                    partnerBank.*,
                    partnerIdProof.*
                FROM
                    partner
                LEFT JOIN
                    user ON user.id = partner.user_id
                LEFT JOIN
                    partnerBank ON partnerBank.partner_id = partner.id
                LEFT JOIN
                    partnerIdProof ON partnerIdProof.partner_id = partner.id
                WHERE
                    partner.user_id = userData.id
            */

      const partnerData = await db
        .select({
          user,
          partner,
          partnerBank,
          partnerIdProof,
        })
        .from(partner)
        .innerJoin(user, sql`${user.id} = ${partner.user_id}`)
        .leftJoin(partnerBank, sql`${partnerBank.partner_id} = ${partner.id}`)
        .leftJoin(
          partnerIdProof,
          sql`${partnerIdProof.partner_id} = ${partner.id}`
        )
        .where(sql`${partner.user_id} = ${userData.id}`);

      if (!partnerData) {
        return resolve(null);
      }

      const secureBankDetails = (bank: any) => {
        [
          "account_number",
          "branch_name",
          "ifsc",
          "account_holder",
          "upi_id",
        ].forEach((field) => {
          bank[field] = secureText(bank[field], 3);
        });
      };

      const mapProofType = (proof: any) => {
        proof.proof_type = partnerIdProofTypes.find(
          (p) => p.id === proof.proof_type_id
        )?.name;
        proof.proof_number = secureText(proof.proof_number, 0);
      };

      const securedPartnerData = partnerData.map((data: any) => {
        if (data.partnerBank) secureBankDetails(data.partnerBank);
        if (data.partnerIdProof) mapProofType(data.partnerIdProof);
        return data;
      });

      resolve(securedPartnerData);
    } catch (error) {
      reject(error);
    }
  });
};



// Get partner analytics
export const getPartnerAnalytics = async (
  user: User,
  start: string,
  end: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      /*
                SELECT
                    strftime('%Y-%m', profile.created_at) AS month,
                    COUNT(profile.id) AS count
                FROM
                    partner
                LEFT JOIN
                    profile ON profile.partner_id = partner.id
                WHERE
                    profile.partner_id = partner.id AND
                    profile.created_at BETWEEN start AND end
                GROUP BY
                    strftime('%Y-%m', profile.created_at)
                ORDER BY
                    strftime('%Y-%m', profile.created_at)
            */

      const referredProfiles = await db
        .select({
          month: sql`strftime('%Y-%m', profile.created_at)`,
          count: count(profile.id).as("count"),
        })
        .from(partner)
        .leftJoin(profile, sql`profile.partner_id = partner.id`)
        .where(
          sql`
                    profile.partner_id = ${partner.id} AND
                    partner.user_id = ${user.id} AND
                    profile.created_at BETWEEN ${start} AND ${end}
                `
        )
        .groupBy(sql`strftime('%Y-%m', profile.created_at)`)
        .orderBy(sql`strftime('%Y-%m', profile.created_at)`);

      const allMonths = eachMonthOfInterval({
        start: new Date(start),
        end: new Date(end),
      }).map((date) => format(date, "yyyy-MM"));

      const result = allMonths.map((month) => {
        const profile = referredProfiles.find((p) => p.month === month);
        return {
          month,
          count: profile ? profile.count : 0,
        };
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};



// Update partner status
export const updatePartnerStatus = async (id: string, status: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      // SQL Query : UPDATE partner SET status = $1 WHERE id = $2 RETURNING *

      const result = await db
        .update(partner)
        .set({ status: status })
        .where(eq(partner.id, id))
        .returning();

      resolve(result[0]);
    } catch (error) {
      reject(error);
    }
  });
};



// Get all partners
export const getAllPartners = async (start_date: string, end_date: string) => {
  return new Promise(async (resolve, reject) => {
    try {

      /*
        SELECT
            user.name,
            user.phone,
            user.email,
            partner.referral_code,
            partnerBank.*,
            partnerIdProof.*
        FROM
            partner
        LEFT JOIN
            user ON user.id = partner.user_id
        LEFT JOIN
            partnerBank ON partnerBank.partner_id = partner.id
        LEFT JOIN
            partnerIdProof ON partnerIdProof.partner_id = partner.id
        ORDER BY
            partner.created_at DESC
      */

      const partnerData = await db
        .select({
          user,
          partner,
          partnerBank,
          partnerIdProof,
        })
        .from(partner)
        .innerJoin(user, sql`${user.id} = ${partner.user_id}`)
        .leftJoin(partnerBank, sql`${partnerBank.partner_id} = ${partner.id}`)
        .leftJoin(
          partnerIdProof,
          sql`${partnerIdProof.partner_id} = ${partner.id}`
        )
        .orderBy(sql`${partner.created_at} DESC`);

      if (!partnerData) {
        resolve(null);
      }

      const securedPartnerData = await Promise.all(
        partnerData.map(async (data: {
          user: User;
          partner: Partner;
          partnerBank?: PartnerBank;
          partnerIdProof?: PartnerIdProof;
        }) => {
          if (data.partnerBank) data.partnerBank;
          if (data.partnerIdProof) data.partnerIdProof;
          
          dataSanitizer(data);

          const start = start_date;
          const end = end_date;

          const analytics = await getPartnerAnalytics(data.user, start, end);
          return { ...data, analytics };
        })
      );

      resolve(securedPartnerData);
    } catch (error) {
      reject(error);
    }
  });
};

// Data sanitizer for partner data
const dataSanitizer = (data: any) => {
  if (Array.isArray(data)) {
    data.forEach(dataSanitizer);
  } else if (typeof data === "object" && data !== null) {
    ['created_at', 'updated_at', 'role', 'user_id'].forEach((field) => {
      if (data[field]) {
        delete data[field];
      }
    });
    Object.values(data).forEach(dataSanitizer);
  }
};
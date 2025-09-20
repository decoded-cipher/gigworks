
import { Env } from "hono";
import { queryGeminiService } from "../config/gemini";
import { getProfilesBySubCategoryOption } from "../services/profile";
import { getAllSubCategoryOptions, getSubCategoryOptionByName } from "../services/subCategoryOption";



/**
 * Process the service check request
 * @param {string} message - The user message to classify
 * @returns {Promise<string[] | "NOT_FOUND">} - An array of the top 3 services or "NOT_FOUND"
 */

export const processCheckService = async (message: string, env: Env): Promise<string[] | "NOT_FOUND"> => {
    try {

        const allOptions = await getAllSubCategoryOptions();

        if (!allOptions || allOptions.length === 0) {
            console.log("No options found");
            return "NOT_FOUND";
        }

        const prompt = `
            You are a smart service classifier for a platform that offers over 250 services.

            Based on the user message below, rank the **top 3 most appropriate** services from this list:
            ${JSON.stringify(allOptions)}

            Only return the **exact matching service names** from the list above as an array of up to 3 items. If you can't confidently find any matches, return "NOT_FOUND".

            User message: "${message}"
        `.trim();

        try {            

            const response = await queryGeminiService(prompt, env);

            if (response && typeof response === "string") {

                if (response.includes("NOT_FOUND")) {
                    console.log("Response indicates no match found");
                    return "NOT_FOUND";
                }

                const parsedResponse = JSON.parse(response);

                if (Array.isArray(parsedResponse) && parsedResponse.length > 0) {
                    const validMatches = parsedResponse.filter(option => allOptions.includes(option));
                    if (validMatches.length === 0) {
                        return "NOT_FOUND";
                    }
                    return validMatches.slice(0, 3);
                }

                console.log("No valid matches found in response");
                return "NOT_FOUND";

            }
            console.log("Invalid response format");
            return "NOT_FOUND";

        } catch (error) {
            console.error("Error querying Gemini service:", error);
            throw error;

        }

    } catch (error) {
        console.error("Error processing service check:", error);
        throw error;
    }
};



/**
 * Process the service request
 * @param {string} service - The service requested by the user
 * @param {any} location - The user's location
 * @returns {Promise<any>} - A formatted message with the profiles or an error message
 */

export const processRequestService = async (service: string, location: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {

            const subCategoryOption = await getSubCategoryOptionByName(service);
            if (!subCategoryOption) {
                resolve();
            }        
    
            const profiles = await getProfilesBySubCategoryOption(subCategoryOption.id, location);
            if (!profiles || profiles.length === 0) {
                resolve();
            }        
    
            const formattedMessage = profiles.map((profile, index) => {
                return `${index + 1}️⃣ *${profile.name}* \n📞 Phone: ${profile.user.phone || 'N/A'} \n👤 Owner: ${profile.user.name || 'N/A'} \n🔗 View Profile: https://gigwork.co.in/${profile.slug}`;
            }).join('\n\n');
    
            resolve({
                message: formattedMessage,
                profiles: profiles
            });
    
        } catch (error) {
            console.error("Error processing service request:", error);
            throw error;
        }
    })
}



export const sendOtpToInterakt = async (otp: string, phone: string, env: Env) => {

    const url = `https://api.interakt.ai/v1/public/message/`;

    // Clean phone number (remove any non-digits)
    const cleanPhone = phone.replace(/\D/g, '');
    
    const payload = {
        type: "Template",
        phoneNumber: cleanPhone,
        countryCode: "91",
        callbackData: "user_login_otp",
        template: {
            name: "gigwork",
            languageCode: "en",
            headerValues: [],
            bodyValues: [otp],
            buttonValues: {
                "0": [otp]
            }
        }
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${env.INTERAKT_API_KEY}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error sending message: ${response.statusText} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error sending message to Interakt:", error);
        throw error;
    }
}

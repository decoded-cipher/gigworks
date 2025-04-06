
import { queryGeminiService } from "../config/gemini";
import { getAllSubCategoryOptions } from "../services/subCategoryOption";



/**
 * Process the service check request
 * @param {string} message - The user message to classify
 * @returns {Promise<string[] | "NOT_FOUND">} - An array of the top 3 services or "NOT_FOUND"
 */

export const processCheckService = async (message: string): Promise<string[] | "NOT_FOUND"> => {
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

            const response = await queryGeminiService(prompt);

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

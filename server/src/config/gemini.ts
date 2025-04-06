
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanUpContent } from "../utils/helpers";

const genAI = new GoogleGenerativeAI("AIzaSyB8429izStSKq5mG0hUsxCczCNDFxGP3U0");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });



/**
 * Queries the Gemini service with a given message and returns the cleaned response.
 * @param {string} message - The message to send to the Gemini service.
 * @returns {Promise<string>} - The cleaned response from the Gemini service.
 */

export const queryGeminiService = async (message) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await model.generateContent([message]);

            if (result.response && result.response.candidates && result.response.candidates[0]) {
                const candidate = result.response.candidates[0].content.parts[0];

                if (candidate && typeof candidate.text === "string") {
                    const cleanedCandidate = cleanUpContent(candidate.text);                    
                    resolve(cleanedCandidate);
                } else {
                    reject(new Error("Invalid candidate format: Missing or invalid 'text' field"));
                }
            } else {
                reject(new Error("Invalid response from Gemini service: Missing 'candidates'"));
            }
        } catch (error) {
            reject(error);
        }
    });
};

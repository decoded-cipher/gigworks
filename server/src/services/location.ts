
import { Coordinates } from '../config/database/interfaces';



// Extract coordinates from Google Maps URLs
export const extractCoordinates = async (shortUrl: string): Promise<Coordinates | null> => {
    try {

        /**
         * Examples:
         * - "https://www.google.com/maps/search/?api=1&query=9.4624505,76.5487243"
         * - "https://maps.app.goo.gl/udDDbsRiVaDbra9BA"
        **/

        const queryRegex = /query=(-?\d+\.\d+),(-?\d+\.\d+)/;
        const queryMatch = shortUrl.match(queryRegex);

        if (queryMatch) {
            return {
                latitude: parseFloat(queryMatch[1]),
                longitude: parseFloat(queryMatch[2]),
            };
        }

        const response = await fetch(shortUrl, {
            method: "GET",
            redirect: "manual"
        });

        const fullUrl = response.headers.get("location");

        if (!fullUrl) {
            throw new Error("Failed to expand URL");
        }

        const otherRegex = /@(-?\d+\.\d+),(-?\d+\.\d+)|\/place\/(-?\d+\.\d+),(-?\d+\.\d+)/;
        const otherMatch = fullUrl.match(otherRegex);

        if (otherMatch) {
            return {
                coordinates: {
                    latitude: parseFloat(otherMatch[1] || otherMatch[3]),
                    longitude: parseFloat(otherMatch[2] || otherMatch[4]),
                },
                urls: {
                    short: shortUrl,
                    full: fullUrl,
                }
            }
        } else {
            throw new Error("Coordinates not found in URL");
        }
    } catch (error) {
        console.error("Error processing URL:", error);
        return null;
    }
};

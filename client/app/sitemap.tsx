
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://gigwork.co.in";

    const routes = ["", "/explore", "/privacy", "/terms"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 1,
    }));

    // Add reference to profile sitemap
    const profileSitemapRef = {
        url: `${baseUrl}/profile-sitemap.xml`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    };

    return [...routes, profileSitemapRef];
}
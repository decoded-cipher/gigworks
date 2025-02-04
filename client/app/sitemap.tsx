
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://gigwork.co.in";

    const routes = ["", "/explore", "/privacy", "/terms"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 1,
    }));

    return routes;
    

    // const profiles = await fetchProfileSlugs();

    // const serviceRoutes = profiles.map((profile) => ({
    //     url: `${baseUrl}/profile/${profile.slug}`,
    //     lastModified: new Date().toISOString(),
    //     changeFrequency: "weekly" as const,
    //     priority: 0.7,
    // }));

    // return [...routes, ...serviceRoutes];

}

// async function fetchProfileSlugs() {
//     return [];
// }

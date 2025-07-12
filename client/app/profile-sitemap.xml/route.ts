import { NextResponse } from "next/server";

export async function GET() {
    const baseUrl = "https://gigwork.co.in";

    const profileSlugs = [
        "acmedecor",
        "jyo",
        "sriambikadecor",
        "pathilelectricals",
        "drona",
        "axbicovers",
        "highlights",
        "altech",
        "avmcarcare",
        "anjaneya",
        "naskofoods",
        "gigwork",
        "adobedesigns",
        "fabtech",
        "devmorphix",
        "athul",
        "bhavaka",
        "jagmodz",
        "sr-associates",
        "arjunuxd",
        "snapshotsaaga",
        "suryarings",
        "kasthuritissue",
        "escobarcafe",
        "miracleeventplanners",
        "cococho",
        "emilia",
        "cleaningstars",
        "wedboatphotography",
        "mktech",
        "adamandeve"
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${profileSlugs.map((slug) => `
        <url>
            <loc>${baseUrl}/${slug}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>`).join('\n')}
    </urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}

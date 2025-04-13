
import { Env } from "hono";

import { getTotalPartnerCount } from "./partner";
import { getProfileCount } from "./profile";
import { getUserCount } from "./user";



// Get overall analytics
export const getOverallAnalytics = async (start: string, end: string, env: Env) => {
    return new Promise(async (resolve, reject) => {
        try {

            const partnerCount = await getTotalPartnerCount();
            const profileCount = await getProfileCount();
            const userCount = await getUserCount();

            if (!partnerCount || !profileCount || !userCount) {
                reject('Failed to fetch partner, profile, or user count');
            }

            const query = `
                query {
                    viewer {
                        zones(filter: {zoneTag: "${env.CLOUDFLARE_ANALYTICS_API_ZONE_ID}"}) {
                            httpRequests1dGroups(
                                orderBy: [date_DESC], 
                                limit: 100, 
                                filter: {
                                    date_geq: "${start}", 
                                    date_lt: "${end}"
                                }
                            ) {
                                dimensions {
                                    date
                                }
                                sum {
                                    pageViews
                                    requests
                                }
                                uniq {
                                    uniques
                                }
                            }
                        }
                    }
                }
            `;
    
            const response = await fetch(env.CLOUDFLARE_ANALYTICS_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${env.CLOUDFLARE_ANALYTICS_API_TOKEN}`,
                },
                body: JSON.stringify({ query }),
            });
    
            const rawData = await response.json();
    
            if (!response.ok) {
                reject(`API responded with status ${response.status}: ${JSON.stringify(rawData.errors || {})}`);
            }
    
            const groups = rawData?.data?.viewer?.zones?.[0]?.httpRequests1dGroups;
    
            if (!groups || !Array.isArray(groups)) {
                reject('Invalid or missing analytics data.');
            }
    
            const totals = groups.reduce(
                (acc, group) => {
                    acc.pageViews += group.sum.pageViews || 0;
                    acc.requests += group.sum.requests || 0;
                    acc.uniqueVisitors += group.uniq.uniques || 0;
                    return acc;
                },
                { pageViews: 0, requests: 0, uniqueVisitors: 0 }
            );
                
            resolve({
                analytics: totals,
                metrics: {
                    partners: partnerCount,
                    profiles: profileCount - 1000,
                    users: userCount,
                },
            });
    
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to fetch overall analytics');
        }
    })
};



// Get detailed analytics
export const getDetailedAnalytics = async (start: string, end: string, env: Env) => {
    return new Promise(async (resolve, reject) => {
        try {

            const query = `
                query {
                    viewer {
                        zones(filter: {zoneTag: "${env.CLOUDFLARE_ANALYTICS_API_ZONE_ID}"}) {
                            httpRequests1dGroups(
                                orderBy: [date_ASC], 
                                limit: 100, 
                                filter: {
                                    date_geq: "${start}",
                                    date_lt: "${end}"
                                }
                            ) {
                                dimensions {
                                    date
                                }
                                sum {
                                    browserMap {
                                        pageViews
                                        uaBrowserFamily
                                    }
                                    pageViews
                                    requests
                                }
                                uniq {
                                    uniques
                                }
                            }
                        }
                    }
                }
            `;
    
            const response = await fetch(env.CLOUDFLARE_ANALYTICS_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${env.CLOUDFLARE_ANALYTICS_API_TOKEN}`,
                },
                body: JSON.stringify({ query }),
            });
    
            const rawData = await response.json();
    
            if (!response.ok) {
                reject(`API responded with status ${response.status}: ${JSON.stringify(rawData.errors || {})}`);
            }
    
            const groups = rawData?.data?.viewer?.zones?.[0]?.httpRequests1dGroups;
    
            if (!groups || !Array.isArray(groups)) {
                reject('Invalid or missing analytics data.');
            }

            const processedData = groups.map(group => ({
                date: group.dimensions.date,
                pageViews: group.sum.pageViews,
                requests: group.sum.requests,
                uniqueVisitors: group.uniq.uniques,
                browsers: group.sum.browserMap.map(browser => ({
                    name: browser.uaBrowserFamily,
                    pageViews: browser.pageViews
                }))
            }));

            resolve(processedData);
    
        } catch (error) {
            console.error('Error:', error);
            reject('Failed to fetch detailed analytics');
        }
    });
};
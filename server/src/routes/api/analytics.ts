import { Hono } from 'hono';
const router = new Hono();

const CLOUDFLARE_ANALYTICS_API = 'https://api.cloudflare.com/client/v4/graphql';
const CLOUDFLARE_ANALYTICS_API_TOKEN = '';
const CLOUDFLARE_ANALYTICS_API_ZONE_ID = '';

const CLOUDFLARE_ANALYTICS_API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CLOUDFLARE_ANALYTICS_API_TOKEN}`,
};



/**
 * @route   GET /api/v1/analytics
 * @desc    Get total analytics data
 * @access  Public
 * @params  start, end
 * @return  { message, range, totals }
 * @error   400, { error }
 * @status  200, 400
 * @example /api/v1/analytics?start=2023-01-01&end=2023-01-31
*/

router.get('/', async (c) => {
    try {
        const start = c.req.query('start');
        const end = c.req.query('end');

        const query = `
            query {
                viewer {
                    zones(filter: {zoneTag: "${CLOUDFLARE_ANALYTICS_API_ZONE_ID}"}) {
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

        const response = await fetch(CLOUDFLARE_ANALYTICS_API, {
            method: 'POST',
            headers: CLOUDFLARE_ANALYTICS_API_HEADERS,
            body: JSON.stringify({ query }),
        });

        const rawData = await response.json();

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}: ${JSON.stringify(rawData.errors || {})}`);
        }

        const groups = rawData?.data?.viewer?.zones?.[0]?.httpRequests1dGroups;

        if (!groups || !Array.isArray(groups)) {
            throw new Error('Invalid or missing analytics data.');
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

        return c.json({
            message: 'Total analytics data retrieved successfully',
            range: { start, end },
            totals
        });

    } catch (error) {
        console.error('Error:', error);
        return c.json({
            message: 'Failed to retrieve analytics data',
            error: error.message,
            details: error.stack,
            timestamp: new Date().toISOString()
        }, 500);
    }
});


/**
 * @route   GET /api/v1/analytics/days
 * @desc    Get daily analytics data
 * @access  Public
 * @params  start, end
 * @return  { message, range, data }
 * @error   400, { error }
 * @status  200, 400
 * @example /api/v1/analytics
*/

router.get('/days', async (c) => {
    try {
        const start = c.req.query('start');
        const end = c.req.query('end');

        const query = `
            query {
                viewer {
                    zones(filter: {zoneTag: "${CLOUDFLARE_ANALYTICS_API_ZONE_ID}"}) {
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
        
        const response = await fetch(CLOUDFLARE_ANALYTICS_API, {
            method: 'POST',
            headers: CLOUDFLARE_ANALYTICS_API_HEADERS,
            body: JSON.stringify({ query }),
        });

        const rawData = await response.json();
        
        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}: ${JSON.stringify(rawData.errors || {})}`);
        }
        
        if (!rawData.data || !rawData.data.viewer || !rawData.data.viewer.zones || !rawData.data.viewer.zones[0]) {
            throw new Error(`Invalid API response structure: ${JSON.stringify(rawData)}`);
        }

        const analyticsData = rawData.data.viewer.zones[0].httpRequests1dGroups;
        
        if (!analyticsData) {
            throw new Error('No analytics data found in the response');
        }

        const processedData = analyticsData.map(group => ({
            date: group.dimensions.date,
            pageViews: group.sum.pageViews,
            requests: group.sum.requests,
            uniqueVisitors: group.uniq.uniques,
            browsers: group.sum.browserMap.map(browser => ({
                name: browser.uaBrowserFamily,
                pageViews: browser.pageViews
            }))
        }));

        return c.json({
            message: 'Analytics data retrieved successfully',
            data: processedData
        });
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        
        return c.json({
            message: 'Error fetching analytics data',
            error: error.message,
            details: error.stack,
            timestamp: new Date().toISOString()
        }, 500);
    }
});



/**
 * @route   GET /api/v1/analytics/health
 * @desc    Health check for the analytics API
 * @access  Public
 * @return  { status, timestamp }
 * @status  200
 * @example /api/v1/analytics/health
*/

router.get('/health', (c) => {
    return c.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});



export default router;
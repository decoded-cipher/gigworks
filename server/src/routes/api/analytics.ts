import { Hono } from 'hono';
const router = new Hono();

import { getOverallAnalytics, getDetailedAnalytics } from '../../services/analytics';



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

        if (!start || !end) {
            return c.json({
                message: 'Start and end dates are required'
            }, 400);
        }

        const analyticsData = await getOverallAnalytics(start, end, c.env);
        
        if (!analyticsData) {
            return c.json({
                message: 'No analytics data found',
                timestamp: new Date().toISOString()
            }, 404);
        }

        return c.json({
            message: 'Total analytics data retrieved successfully',
            range: { start, end },
            totals: analyticsData
        });

    } catch (error) {
        return c.json({
            message: 'Failed to retrieve analytics data',
            error: error
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

        if (!start || !end) {
            return c.json({
                message: 'Start and end dates are required'
            }, 400);
        }

        const analyticsData = await getDetailedAnalytics(start, end, c.env);

        if (!analyticsData) {
            return c.json({
                message: 'No analytics data found'
            }, 404);
        }

        return c.json({
            message: 'Analytics data retrieved successfully',
            data: analyticsData,
        });
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        
        return c.json({
            message: 'Error fetching analytics data',
            error: error
        }, 500);
    }
});



export default router;
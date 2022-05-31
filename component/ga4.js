import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { google } from 'googleapis'
import config from '../config';

const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
        client_email: config.google.clientEmail,
        private_key: config.google.privateKey,
    },
});

const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
const jwt = new google.auth.JWT(config.google.clientEmail, null, config.google.privateKey, scopes)

async function ga4Custom(propertyId, startDate, endDate, dimensions, metrics) {
    try {

        // Enabled Google Analytics Data API
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{
                startDate: startDate,
                endDate: endDate,
            }, ],
            dimensions: [{
                name: dimensions,
            }, ],
            metrics: [{
                name: metrics,
            }, ],
        });
        let ga4DimenstionArray = []
        let ga4MetricsArray = []
        response.rows.forEach(row => {
            console.log(row.dimensionValues[0].value);
            console.log(row.metricValues[0].value);
            ga4DimenstionArray.push(row.dimensionValues[0].value)
            ga4MetricsArray.push(row.metricValues[0].value)
        });
        return [ga4DimenstionArray, ga4MetricsArray]
    } catch (error) {
        return 'error: ' + error
    }
}

async function ga3Custom(gaViewId, startDate, endDate, dimensions, metrics) {
    try {
        // Enabled Google Analytics API
        const jwtAuth = await jwt.authorize()
        let params = {
            'auth': jwt,
            'ids': 'ga:' + gaViewId,
            'start-date': startDate,
            'end-date': endDate,
            'metrics': 'ga:' + metrics,
            'dimensions': 'ga:' + dimensions,
        };
        const result = await google.analytics('v3').data.ga.get(params)
        return result.data.rows
    } catch (error) {
        return error
    }
}

export { ga4Custom, ga3Custom }
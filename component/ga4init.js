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

const propertyId = config.google.ga4Id;
// ga4Api();
async function ga4Api() {
    // Enabled Google Analytics Data API
    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{
            startDate: '2022-05-27',
            endDate: 'today',
        }, ],
        dimensions: [{
            name: 'date',
        }, ],
        metrics: [{
            name: 'activeUsers',
        }, ],
    });
    let ga4DimenstionArray = []
    let ga4MetricsArray = []
    response.rows.forEach(row => {
        ga4DimenstionArray.push(row.dimensionValues[0].value)
        ga4MetricsArray.push(row.metricValues[0].value)
    });
    console.log(ga4DimenstionArray);
    console.log(ga4MetricsArray);
}

// ga3Api()
async function ga3Api() {
    // Enabled Google Analytics API
    const jwtAuth = await jwt.authorize()
    let params = {
        'auth': jwt,
        'ids': 'ga:' + config.google.ga3Id,
        'start-date': '2022-05-26',
        'end-date': '2022-05-26',
        'metrics': 'ga:pageviews',
        'dimensions': 'ga:date'
    };
    const result = await google.analytics('v3').data.ga.get(params)
    console.log(result.data.rows);
}
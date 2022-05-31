# GA4 Note
git clone 
yarn install
yarn start

1. 所有匯出排程都在 ./routes/allSchedule.js
2. GA3 GA4 init ./component/ga4init.js

## Ref For Nodejs
https://7nohe-tech-blog.vercel.app/post/node-js-google-analytics-4-ga4-contentful-google-analytics-data-api

https://dns.sample.com/ga3/106152872/2022-05-20/2022-05-27/date/pageViews

https://dns.sample.com/ga4/308596645/2022-05-20/2022-05-27/date/screenPageViews
## Request Body
[官方文件]
(https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/batchRunReports)

```
{
  "property": string,
  "dimensions": [
    {
      object (Dimension)
    }
  ],
  "metrics": [
    {
      object (Metric)
    }
  ],
  "dateRanges": [
    {
      object (DateRange)
    }
  ],
  "dimensionFilter": {
    object (FilterExpression)
  },
  "metricFilter": {
    object (FilterExpression)
  },
  "offset": string,
  "limit": string,
  "metricAggregations": [
    enum (MetricAggregation)
  ],
  "orderBys": [
    {
      object (OrderBy)
    }
  ],
  "currencyCode": string,
  "cohortSpec": {
    object (CohortSpec)
  },
  "keepEmptyRows": boolean,
  "returnPropertyQuota": boolean
}
```
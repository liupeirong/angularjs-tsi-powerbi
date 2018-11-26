(function (window) {
  window.__env = window.__env || {};

  window.__env.tsiEndpoint = 'https://api.timeseries.azure.com/';
  window.__env.pbiEndpoint = 'https://analysis.windows.net/powerbi/api';

  window.__env.tsiEnv = '{Your Azure TSI envrionment}.env.timeseries.azure.com'; 
  // Policy change, can't consent new apps in AAD any more, so have to reuse 2 existing apps, one for TSI and one for Power BI 
  window.__env.tsiClientId = '{Your Azure AD app id for this app to embed TSI}'; 
  window.__env.pbiClientId = '{Your Azure AD app id for this app to embed Power BI}'; 
  window.__env.tsiMetric1 = '{your metric in TSI to be embedded in the first static chart}';
  window.__env.tsiMetric2 = '{your metric in TSI to be embedded in both the static and real time charts}';
  window.__env.staticPastNDays = 2; // the static chart shows past N days of data
  window.__env.realtimePastNHours = 1; // the real time chart shows past N hours of data
  window.__env.stopsAfterNRefreshes = 100; // the real time chart will stop refreshing (querying backend) after this interval
  window.__env.pbiReportEmbedUrl = 'https://{Your Power BI account}.powerbi.com/reportEmbed?reportId={your report id}';

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;

}(this));
/**
 * Created by ed on 06/02/2018.
 */

'use strict';

// it's okay, it's a public data
const TRACKING_ID = 'UA-109224221-1';

/* eslint-disable */
const init = function () {
    // https://developers.google.com/analytics/devguides/collection/analyticsjs
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments);
        }, i[r].l = 1 * new Date();
        a = s.createElement(o), m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    window.ga('create', TRACKING_ID, 'auto');
};
/* eslint-enable */

const send = function(method, options = {}) {
  window.ga || init();
  return window.ga('send', method, options);
};

const sendEvent = function(category, action, label) {
  return send('event', {
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
  });
};

export const trackPageView = function() {
  return send('pageview');
};

export const trackScheduleRequest = function(type, group) {
  return sendEvent('Schedule Input', type, group);
};

export const trackScheduleResult = function(result, group) {
  return sendEvent('Schedule Response', result, group);
};

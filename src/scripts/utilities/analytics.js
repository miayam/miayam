/**
 * Tracking setup based on this article:
 * https://philipwalton.com/articles/the-google-analytics-setup-i-use-on-every-site-i-build/#tracking-custom-data
 */
export default () => {
    const TRACKING_VERSION = "1";
    const NULL_VALUE = "(not set)";

    /**
     * A mapping between custom dimension names and their indexes.
     */
    const dimensions = {
        TRACKING_VERSION: "dimension1",
        CLIENT_ID: "dimension2",
        WINDOW_ID: "dimension3",
        HIT_ID: "dimension4",
        HIT_TIME: "dimension5",
        HIT_TYPE: "dimension6",
        HIT_SOURCE: "dimension7",
        VISIBILITY_STATE: "dimension8",
        URL_QUERY_PARAMS: "dimension9"
    };

    /**
     * A mapping between custom metric names and their indexes.
     */
    const metrics = {
        RESPONSE_END_TIME: "metric1",
        DOM_LOAD_TIME: "metric2",
        WINDOW_LOAD_TIME: "metric3",
        MAX_SCROLL_PERCENTAGE: "metric4",
        PAGE_VISIBLE: "metric5",
        PAGE_LOADS: "metric6"
    };

    // Provide tracking ids in .env
    // See .env.example
    const ALL_TRACKERS = [
        { name: "prod", trackingId: process.env.GA_TRACKER_ID_PROD },
        { name: "dev", trackingId: process.env.GA_TRACKER_ID_DEV }
    ];

    // Provide tracker based on NODE_ENV (prod | dev)
    const ACTIVE_TRACKER = ALL_TRACKERS.filter(({ name }) => process.env.NODE_ENV === name);

    const getDefinitionIndex = definition => +/\d+$/.exec(definition)[0];
    const uuid = function b(a) {
        return a
            ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
            : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
    };

    /**
     * Creates a ga() proxy function that calls commands on all passed trackers.
     * @param {!Array} trackers an array or objects containing the `name` and
     *     `trackingId` fields.
     * @return {!Function} The proxied ga() function.
     */
    const createGaProxy = trackers => {
        return (command, ...args) => {
            for (let { name } of trackers) {
                if (typeof command == "function") {
                    ga(() => {
                        command(ga.getByName(name));
                    });
                } else {
                    ga(`${name}.${command}`, ...args);
                }
            }
        };
    };

    /**
     * Command queue proxies
     */
    const gaAll = createGaProxy(ACTIVE_TRACKER);

    function createTrackers() {
        ACTIVE_TRACKER.forEach(function (tracker) {
            window.ga("create", tracker.trackingId, "auto", tracker.name);
        });

        // this anonymize IP in order to avoid cookie consent acording some resources: https://consent.guide/google-analytics-cookie-consent/
        gaAll("set", "anonymizeIp", true);
        gaAll("set", "transport", "beacon");
        gaAll("send", "pageview");
    }

    function trackError() {
        gaAll(
            "send",
            "event",
            Object.assign(
                {
                    eventCategory: "Error",
                    eventAction: err.name || "(no error name)",
                    eventLabel: `${err.message}\n${err.stack || "(no stack trace)"}`,
                    nonInteraction: true
                },
                fieldsObj
            )
        );
    }

    function trackErrors() {
        // Errors that have occurred prior to this script running are stored on
        // `window.__e.q`, as specified in `index.html`.
        const loadErrorEvents = (window.__e && window.__e.q) || [];

        const trackErrorEvent = event => {
            // Use a different eventCategory for uncaught errors.
            const fieldsObj = { eventCategory: "Uncaught Error" };

            // Some browsers don't have an error property, so we fake it.
            const err = event.error || {
                message: `${event.message} (${event.lineno}:${event.colno})`
            };

            trackError(err, fieldsObj);
        };

        // Replay any stored load error events.
        for (let event of loadErrorEvents) {
            trackErrorEvent(event);
        }

        // Add a new listener to track event immediately.
        window.addEventListener("error", trackErrorEvent);
    }

    function trackCustomDimensions() {
        // Sets a default dimension value for all custom dimensions to ensure
        // that every dimension in every hit has *some* value. This is necessary
        // because Google Analytics will drop rows with empty dimension values
        // in your reports.
        Object.keys(dimensions).forEach(key => {
            gaAll("set", dimensions[key], NULL_VALUE);
        });

        // Adds tracking of dimensions known at page load time.
        gaAll(tracker => {
            tracker.set({
                [dimensions.TRACKING_VERSION]: TRACKING_VERSION,
                [dimensions.CLIENT_ID]: tracker.get("clientId"),
                [dimensions.WINDOW_ID]: uuid()
            });
        });

        // Adds tracking to record each the type, time, uuid, and visibility state
        // of each hit immediately before it's sent.
        gaAll(tracker => {
            const originalBuildHitTask = tracker.get("buildHitTask");
            tracker.set("buildHitTask", model => {
                const qt = model.get("queueTime") || 0;
                model.set(dimensions.HIT_TIME, String(new Date() - qt), true);
                model.set(dimensions.HIT_ID, uuid(), true);
                model.set(dimensions.HIT_TYPE, model.get("hitType"), true);
                model.set(dimensions.VISIBILITY_STATE, document.visibilityState, true);

                originalBuildHitTask(model);
            });
        });
    }

    function requireAutotrackPlugins() {
        gaAll("require", "cleanUrlTracker", {
            stripQuery: true,
            queryDimensionIndex: getDefinitionIndex(dimensions.URL_QUERY_PARAMS),
            trailingSlash: "remove"
        });
        gaAll("require", "maxScrollTracker", {
            sessionTimeout: 30,
            timeZone: "Asia/Indonesia",
            maxScrollMetricIndex: getDefinitionIndex(metrics.MAX_SCROLL_PERCENTAGE)
        });
        gaAll("require", "outboundLinkTracker", {
            events: ["click", "contextmenu"]
        });
        gaAll("require", "pageVisibilityTracker", {
            sendInitialPageview: true,
            pageLoadsMetricIndex: getDefinitionIndex(metrics.PAGE_LOADS),
            visibleMetricIndex: getDefinitionIndex(metrics.PAGE_VISIBLE),
            sessionTimeout: 30,
            timeZone: "Asia/Indonesia",
            fieldsObj: { [dimensions.HIT_SOURCE]: "pageVisibilityTracker" }
        });
    }

    function sendNavigationTimingMetrics() {
        // Only track performance in supporting browsers.
        if (!(window.performance && window.performance.timing)) return;

        // If the window hasn't loaded, run this function after the `load` event.
        if (document.readyState != "complete") {
            window.addEventListener("load", sendNavigationTimingMetrics);
            return;
        }

        const nt = performance.timing;
        const navStart = nt.navigationStart;

        const responseEnd = Math.round(nt.responseEnd - navStart);
        const domLoaded = Math.round(nt.domContentLoadedEventStart - navStart);
        const windowLoaded = Math.round(nt.loadEventStart - navStart);

        // In some edge cases browsers return very obviously incorrect NT values,
        // e.g. 0, negative, or future times. This validates values before sending.
        const allValuesAreValid = (...values) => {
            return values.every(value => value > 0 && value < 6e6);
        };

        if (allValuesAreValid(responseEnd, domLoaded, windowLoaded)) {
            gaAll("send", "event", {
                eventCategory: "Navigation Timing",
                eventAction: "track",
                eventLabel: NULL_VALUE,
                nonInteraction: true,
                [metrics.RESPONSE_END_TIME]: responseEnd,
                [metrics.DOM_LOAD_TIME]: domLoaded,
                [metrics.WINDOW_LOAD_TIME]: windowLoaded
            });
        }
    }

    function init() {
        window.ga =
            window.ga ||
            function () {
                (ga.q = ga.q || []).push(arguments);
            };

        createTrackers();
        trackErrors();
        trackCustomDimensions();
        requireAutotrackPlugins();
        sendNavigationTimingMetrics();
    }

    init();
};

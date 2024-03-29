'use strict';

let _testRefresh = () => { // eslint-disable-line no-underscore-dangle
    throw new Error('Detection has not been initiated');
};

const initiateDetection = ({ classList } = {}) => {
    if (!classList) {
        return;
    }

    const refresh = () => {
        // TODO: Under construction!
        window.requestAnimationFrame(refresh);
    };

    window.requestAnimationFrame(refresh);

    _testRefresh = refresh;
};

// Collect details about runtime environment
const hasWindow =
    window &&
    (typeof window) === 'object';
const hasRegExp =
    hasWindow &&
    window.RegExp &&
    (typeof window.RegExp) === 'function';
const hasNavigator =
    hasWindow &&
    window.navigator &&
    (typeof window.navigator) === 'object';
const hasDocument =
    hasWindow &&
    window.document &&
    (typeof window.document) === 'object';
const hasDocumentElement =
    hasDocument &&
    window.document.documentElement &&
    (typeof window.document.documentElement) === 'object';
const hasActiveElement =
    hasDocument &&
    window.document.activeElement &&
    (typeof window.document.activeElement) === 'object';
const hasProperUserAgent =
    hasRegExp &&
    hasNavigator &&
    (new RegExp('iPad|iPhone|iPod', 'u')).test(window.navigator.userAgent);
const isLiar =
    hasWindow &&
    hasProperUserAgent &&
    window.MSStream;

// Assert whether we're even theoretically able to execute detection
const isSupportedBrowser = (
    (
        // First - let's do a feature-check to see that we actually have
        // everything available we will need to check "everything" up...
        hasWindow &&
        hasRegExp &&
        hasNavigator &&
        hasDocument &&
        hasDocumentElement &&
        hasActiveElement &&
        // Ok... everything is as supposed to be :)
        true
    ) &&
    // Second, check that the client says it is one of the supported ones
    hasProperUserAgent &&
    // Finally, weed out the ones that are known to lie on previous check
!isLiar
);

if (isSupportedBrowser && !window.oskDetectionEnabled) {
    window.oskDetectionEnabled = true;
    initiateDetection(window.document.documentElement);
}

module.exports = {
    __test: {
        refresh: _testRefresh
    }
};

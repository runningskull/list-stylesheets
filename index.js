'use strict';

var cheerio = require('cheerio'),
    extend = require('extend');

module.exports = function (html, options) {
    var results = {};
    var $ = cheerio.load(html, extend(options.cheerioOptions, {
        decodeEntities: false
    }));

    results.hrefs = [];

    $('link').each(function (index, element) {
        var $el = $(element);
        if ($el.attr('rel') && $el.attr('rel').toLowerCase() === 'stylesheet') {
            if (options.applyLinkTags) {
                results.hrefs.push($el.attr('href'));
            }
            if (options.removeLinkTags) {
                $el.remove();
            }
        }
    });

    results.html = $.html();

    return results;
};

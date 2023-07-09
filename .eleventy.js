const beautifyHtml = require('js-beautify').html;

module.exports = function (eleventyConfig) {
    eleventyConfig.addFilter('htmlmin', function(value) {
        return beautifyHtml(value, {
            indent_size: 2,
            indent_char: ' ',
            // any other options go here
        });
    });
    // Copy the `css` directory to the output
    eleventyConfig.addPassthroughCopy("css");

    // Watch the `css` directory for changes
    eleventyConfig.addWatchTarget("css");

    return {
        dir: {
            // default: [site root]
            input: "src",
            // default: _site
            output: "public",
        },
    };
};
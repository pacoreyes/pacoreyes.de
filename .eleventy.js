const beautifyHtml = require('js-beautify').html;

module.exports = function (eleventyConfig) {
    eleventyConfig.addFilter('htmlmin', function(value) {
        return beautifyHtml(value, {
            indent_size: 2,
            indent_char: ' ',
            // any other options go here
        });
    });
    // Copy the `css` and js code directory to the output
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");

    // Watch the `css` and js code directory for changes
    eleventyConfig.addWatchTarget("src/css");
    eleventyConfig.addWatchTarget("src/js");

    return {
        dir: {
            // default: [site root]
            input: "src",
            // default: _site
            output: "public",
        },
    };
};

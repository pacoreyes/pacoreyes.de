const beautifyHtml = require('js-beautify').html;
const { DateTime } = require("luxon");

// Load environment variables from .env file
require('dotenv').config();

// Set environment variable if not already set
process.env.ELEVENTY_ENV = process.env.ELEVENTY_ENV || 'development';
const isProduction = process.env.ELEVENTY_ENV === 'production';

module.exports = function (eleventyConfig) {
    // HTML beautifier filter
    eleventyConfig.addFilter('htmlmin', function(value) {
        return beautifyHtml(value, {
            indent_size: 2,
            indent_char: ' ',
        });
    });

    // Copy assets
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/sitemap.xml");
    eleventyConfig.addPassthroughCopy("src/robots.txt");

    // Watch assets
    eleventyConfig.addWatchTarget("src/css");
    eleventyConfig.addWatchTarget("src/js");
    eleventyConfig.addWatchTarget("src/images");
    eleventyConfig.addWatchTarget("src/sitemap.xml");
    eleventyConfig.addWatchTarget("src/robots.txt");

    // 🔥 Add blog collection from markdown files in /src/blog/posts/
    eleventyConfig.addCollection("blog", function(collectionApi) {
        const posts = collectionApi.getFilteredByGlob("src/blog/posts/*.md");
        return posts;
    });

    // Set standard permalink pattern for blog posts
    eleventyConfig.addGlobalData("eleventyComputed.permalink", function(data) {
        // Check if data exists and has the required properties
        if (data && data.layout === "post.njk" && data.date) {
            const date = new Date(data.date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const slug = data.page.fileSlug.replace(/^\d{4}-\d{2}-\d{2}-/, '');

            return `/blog/${year}/${month}/${day}/${slug}/`;
        }

        // Return undefined for non-blog posts to use their own permalink
        return undefined;
    });

    // Get all tags from a collection
    eleventyConfig.addFilter("getAllTags", collection => {
        let tagSet = new Set();
        for (let item of collection) {
            (item.data.tags || []).forEach(tag => tagSet.add(tag));
        }
        return [...tagSet].sort();
    });

    // Add a filter to format dates
    eleventyConfig.addFilter("date", (value, format = "MMMM d, yyyy") => {
        return DateTime.fromJSDate(new Date(value), { zone: 'utc' }).toFormat(format);
    });

    // Add a shorthand filter for common date formats
    eleventyConfig.addFilter("readableDate", (value) => {
        return DateTime.fromJSDate(new Date(value), { zone: 'utc' }).toFormat("MMMM d, yyyy");
    });

    // Add a filter to get the language from the URL
    eleventyConfig.addFilter("getLanguage", (url) => {
        const langMatch = url.match(/^\/(en|de|es)\//);
        return langMatch ? langMatch[1] : 'en'; // Default to 'en' if no language is specified
    });

    // Add a filter to strip the language prefix from the URL
    eleventyConfig.addFilter("stripLanguage", (url) => {
        return url.replace(/^\/(en|de|es)\//, '/');
    });

    // Enable deep data merge for tags
    eleventyConfig.setDataDeepMerge(true);

    // Configure Eleventy
    return {
        dir: {
            input: "src",       // Your source directory
            output: "public",   // Your build output directory
        }
    };
};

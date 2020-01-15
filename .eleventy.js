const { DateTime } = require("luxon");
const Entities = require('html-entities').XmlEntities;
const fs = require("fs");
const metadata = require('./src/_data/metadata.json');
const nunjucks = require('nunjucks');
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const entities = new Entities();

module.exports = function(eleventyConfig) {
  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));
  eleventyConfig.addFilter('absolute', value => value.indexOf('://') === -1 ? `${metadata.url}/${value}` : value);
  eleventyConfig.addFilter('date', require('nunjucks-date'));
  eleventyConfig.addFilter('escapeXml', value => entities.encodeNonUTF(value));
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.setDataDeepMerge(true)

  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  });

  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};

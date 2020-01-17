const Autolinker = require('autolinker')
const DateTime = require('luxon').DateTime

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('date', (value, format) => {
    return DateTime
      .fromJSDate(value)
      .toFormat(format)
  })

  eleventyConfig.addPairedShortcode('autolink', content => {
    return Autolinker.link(content)
  })

  eleventyConfig.addPassthroughCopy('src/styles')

  return {
    dir: {
      input: 'src',
    },
  }
}

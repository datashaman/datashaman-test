const async = require('async')
const Autolinker = require('autolinker')
const DateTime = require('luxon').DateTime
const emoji = require('node-emoji')
const getUrls = require('get-urls')
const got = require('got')

const metascraper = require('metascraper')([
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo-favicon')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
])

const references = async (content, callback) => {
  const urls = getUrls(content)
  let result = ''

  if (urls.size) {
    result += "\n\n<ul class='references'>"

    await async.each(getUrls(content), async (sourceUrl, cb) => {
      const { body: html, url } = await got(sourceUrl)

      const metadata = await metascraper({ html, url })

      if (!metadata.title) {
        return;
      }

      const description = metadata.description
        ? `<div>${metadata.description}</div>`
        : '';

      const image = metadata.image
        ? `<img src="${metadata.image}">`
        : '';

      result += `<li>
        <blockquote>
        <div class="flex five">
          <div class="fifth">${image}</div>
          <div class="four-fifth">
            <div><a href="${metadata.url}">${metadata.title}</a></div>
            <div>${Autolinker.link(description)}</div>
          </div>
        </div>
        </blockquote>
      </li>`
    })

    result += "\n</ul>"
  }

  callback(null, result)
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('formatDate', (content, format) => {
    return DateTime
      .fromJSDate(content)
      .toFormat(format)
  })

  eleventyConfig.addFilter('emojify', (content) => {
    return emoji.emojify(content)
  })

  eleventyConfig.addFilter('autolink', (content) => {
    return Autolinker.link(content)
  })

  eleventyConfig.addNunjucksAsyncFilter('references', references)

  eleventyConfig.addPassthroughCopy('src/scripts')
  eleventyConfig.addPassthroughCopy('src/slick')
  eleventyConfig.addPassthroughCopy('src/styles')

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_alias: 'summary',
  })

  return {
    dir: {
      input: 'src',
    },
  }
}

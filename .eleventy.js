const async = require('async')
const Autolinker = require('autolinker')
const DateTime = require('luxon').DateTime
const emoji = require('node-emoji')
const getUrls = require('get-urls')
const got = require('got')
const Nunjucks = require('nunjucks')
const pluginLocalImages = require('eleventy-plugin-local-images')
const pluginSass = require('eleventy-plugin-sass')

const metascraper = require('metascraper')([
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo-favicon')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
])

const createReference = async sourceUrl => {}

const getReference = async sourceUrl => {
  const {body: html, url} = await got(sourceUrl)
  const metadata = await metascraper({html, url})

  if (!metadata.title) {
    return ''
  }

  const description = metadata.description
    ? `<div>${metadata.description}</div>`
    : ''

  const image = metadata.image
    ? `<img class="pure-img" src="${metadata.image}">`
    : ''

  return `<li>
    <div class="pure-g">
      <div class="reference-img pure-u-1-8">${image}</div>
      <div class="pure-u-7-8">
        <div><a href="${metadata.url}">${metadata.title}</a></div>
        <div>${Autolinker.link(description)}</div>
      </div>
    </div>
  </li>`
}

const references = async (content, cb) => {
  return cb(null, '')

  const promises = Array.from(getUrls(content)).map(async sourceUrl => {
    const {body: html, url} = await got(sourceUrl)
    const metadata = await metascraper({html, url})

    if (!metadata.title) {
      return ''
    }

    const description = metadata.description
      ? `<div>${metadata.description}</div>`
      : ''

    const image = metadata.image
      ? `<img class="pure-img" src="${metadata.image}">`
      : ''

    return `<li>
        <div class="pure-g">
          <div class="reference-img pure-u-1-8">${image}</div>
          <div class="pure-u-7-8">
            <div><a href="${metadata.url}">${metadata.title}</a></div>
            <div>${Autolinker.link(description)}</div>
          </div>
        </div>
      </li>`
  })

  Promise.all(promises).then(results => {
    const html = results.length
      ? `<ul class="references">${results.join('\n')}</ul>`
      : ''

    cb(null, html)
  })
}

module.exports = function(eleventyConfig) {
  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader('src/_includes')
  )

  let counter = 0

  nunjucksEnvironment.addGlobal('uniqId', (prefix = 'id') => {
    return `${prefix}-${counter++}`
  })

  eleventyConfig.setDataDeepMerge(true)

  eleventyConfig.setLibrary('njk', nunjucksEnvironment)

  eleventyConfig.addFilter('formatDate', (content, format) => {
    return DateTime.fromJSDate(content).toFormat(format)
  })

  eleventyConfig.addFilter('emojify', content => {
    return emoji.emojify(content)
  })

  eleventyConfig.addFilter('autolink', content => {
    return Autolinker.link(content)
  })

  eleventyConfig.addNunjucksAsyncFilter('references', references)

  eleventyConfig.addPassthroughCopy('src/images')
  eleventyConfig.addPassthroughCopy('src/scripts')
  eleventyConfig.addPassthroughCopy('src/styles')

  eleventyConfig.addPlugin(pluginLocalImages, {
    assetPath: '/images',
    distPath: 'src',
    useExisting: true,
    verbose: true,
  })
  eleventyConfig.addPlugin(pluginSass)

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

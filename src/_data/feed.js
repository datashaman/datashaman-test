const Feed = require('feed').Feed
const metadata = require('./metadata.json')
const posts = require('./posts.js')()

const author = {
  "name": "Marlin Forbes",
  "email": "marlinf@datashaman.com",
  "link": "https://datashaman.com/"
}

const generator = "https://github.com/datashaman/datashaman.com"

const feed = new Feed({
  title: metadata.title,
  description: metadata.description,
  id: metadata.url,
  link: metadata.url,
  language: "en",
  image: `${metadata.url}img/profile.png`,
  favicon: `${metadata.url}favicon.ico`,
  copyright: `All rights reserved ©${(new Date()).getFullYear()} ${author.name}`,
  updated: new Date(),
  generator: metadata.generator,
  feedLinks: {
    atom: `${metadata.url}atom.xml`,
    json: `${metadata.url}feed.json`,
    rss: `${metadata.url}rss.xml`,
  },
  author,
})

module.exports = () => {
  posts.forEach(post => {
    let item = {
      title: post.title || '',
      id: `${metadata.url}${post.uuid}/`,
      link: `${metadata.url}${post.uuid}/`,
      description: post.summary || '',
      content: post.html || post.text || '',
      date: post.date,
    }

    if (post.photo) {
      item.image = post.photo[0]
    }

    feed.addItem(item)
  })

  return feed
}

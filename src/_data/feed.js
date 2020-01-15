const Feed = require('feed').Feed
const metadata = require('./metadata.json')
const posts = require('./posts.js')()

module.exports = () => {
  const feed = new Feed({
    title: metadata.title,
    description: metadata.description,
    id: metadata.url,
    link: metadata.url,
    language: "en",
    image: "/img/profile.png",
    favicon: `${metadata.url}favicon.ico`,
    copyright: `All rights reserved &copy; ${(new Date()).getFullYear()} ${metadata.author.name}`,
    updated: new Date(),
    generator: metadata.generator,
    feed: `${metadata.url}rss.xml`,
    feedLinks: {
      atom: `${metadata.url}atom.xml`,
      json: `${metadata.url}feed.json`,
    },
    author: metadata.author,
  })

  posts.forEach(post => {
    let item = {
      title: post.title || '',
      id: `urn:uuid:${post.uuid}`,
      link: `${metadata.url}${post.uuid}/`,
      description: post.summary || '',
      content: post.html || post.text || '',
      author: [
        metadata.author,
      ],
      date: post.date,
    }

    if (post.photo) {
      item.image = post.photo[0]
    }

    feed.addItem(item)
  })

  return feed
}

const Feed = require('feed').Feed
const posts = require('./posts.js')()

const name = 'Marlin Forbes'
const author = {
    name,
    email: "marlinf@datashaman.com",
    link: "https://datashaman.com/",
}

module.exports = () => {
  const feed = new Feed({
    title: "datashaman",
    description: "Freelance developer. Open-source solutions. Wannabe writer.",
    id: "https://datashaman.com/",
    link: "https://datashaman.com/",
    language: "en",
    image: "https://datashaman.com/img/profile.png",
    favicon: "https://datashaman.com/favicon.ico",
    copyright: `All rights reserved &copy; ${(new Date()).getFullYear()} ${name}`,
    updated: new Date(),
    generator: 'https://github.com/datashaman/datashaman.com',
    feed: 'https://datashaman.com/rss.xml',
    feedLinks: {
      atom: "https://datashaman.com/atom.xml",
      json: "https://datashaman.com/feed.json",
    },
    author,
  })

  posts.forEach(post => {
    console.log(post)

    let item = {
      title: post.title || '',
      id: `urn:uuid:${post.uuid}`,
      link: `${author.link}${post.uuid}/`,
      description: post.summary || '',
      content: post.html || post.text || '',
      author: [
        author,
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

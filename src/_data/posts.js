const MarkdownIt = require('markdown-it')
const uuid = require('node-uuid')

module.exports = () => {
    return require('./source.json')
        .filter(post => {
            return post.type[0] === 'h-entry'
        })
        .map(post => {
            let result = {
                source: post,
                uuid: uuid.v4(),
            }

            if (post.properties.rsvp) {
                result.type = 'rsvp'
            } else if (post.properties['in-reply-to']) {
                result.type = 'reply'
            } else if (post.properties['repost-of']) {
                result.type = 'repost'
            } else if (post.properties['like-of']) {
                result.type = 'like'
            } else if (post.properties.video) {
                result.type = 'video'
            } else if (post.properties.photo) {
                result.type = 'photo'
            } else if (post.properties['like-of']) {
                result.type = 'like'
            } else {
                if (post.properties.content) {
                    if (post.properties.content[0].html) {
                        result.html = post.properties.content[0].html
                        result.text = post.properties.content[0].value
                    } else {
                        result.text = post.properties.content[0]

                        const md = new MarkdownIt()
                        result.html = md.render(result.text)
                    }
                } else if (post.properties.summary) {
                    result.html = post.properties.summary[0]
                }

                if (post.properties.name) {
                    result.type = 'article'
                } else {
                    result.type = 'note'
                }
            }

            if (post.properties.audio) {
                result.audio = post.properties.audio
            }

            if (post.properties.name) {
                result.title = post.properties.name
            }

            result.tags = post.properties.category || []

            if (result.tags.indexOf(result.type) === -1) {
                result.tags.push(result.type)
            }

            if (post.properties.photo) {
                result.photo = post.properties.photo
            }

            if (post.properties.published) {
                result.date = new Date(post.properties.published[0])
            } else {
                result.date = new Date()
            }

            if (post.properties.video) {
                result.video = post.properties.video
            }

            return result
        })
}

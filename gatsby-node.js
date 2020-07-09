const path = require(`path`)
const slash = require(`slash`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // query content for WordPress posts
  const result = await graphql(`
    query {
      allWpPage {
        nodes {
          id
          uri
        }
      }
      allWpPost {
        nodes {
          id
          slug
        }
      }
    }
  `)
  const postTemplate = path.resolve(`./src/templates/post.js`)
  result.data.allWpPost.nodes.forEach(post => {
    createPage({
      path: `/blog/${post.slug}`,
      component: slash(postTemplate),
      context: {
        id: post.id,
      },
    })
  })
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  result.data.allWpPage.nodes.forEach(page => {
    if (page.uri === '/blog/') return
    createPage({
      path: page.uri,
      component: slash(pageTemplate),
      context: {
        id: page.id,
      },
    })
  })
}

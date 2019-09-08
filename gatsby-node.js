const path = require(`path`)
const slash = require(`slash`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // query content for WordPress posts
  const result = await graphql(`
    query {
      allWordpressPage {
        edges {
          node {
            id
            slug
          }
        }
      }
      allWordpressPost {
        edges {
          node {
            id
            slug
          }
        }
      }
      wordpressWpFrontpage {
        slug
      }
    }
  `)
  const postTemplate = path.resolve(`./src/templates/post.js`)
  result.data.allWordpressPost.edges.forEach(edge => {
    createPage({
      path: `/blog/${edge.node.slug}`,
      component: slash(postTemplate),
      context: {
        id: edge.node.id,
      },
    })
  })
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  result.data.allWordpressPage.edges.forEach(edge => {
    const isFrontPage = edge.node.slug === result.data.wordpressWpFrontpage.slug
    createPage({
      path: isFrontPage ? `/` : `/${edge.node.slug}`,
      component: slash(pageTemplate),
      context: {
        id: edge.node.id,
      },
    })
  })
}

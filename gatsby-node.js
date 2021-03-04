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
          slug
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
  result.data.allWpPost.nodes.forEach(node => {
    createPage({
      path: `/blog/${node.slug}`,
      component: slash(postTemplate),
      context: {
        id: node.id,
      },
    })
  })
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  result.data.allWpPage.nodes.forEach(node => {
    createPage({
      path: node.uri,
      component: slash(pageTemplate),
      context: {
        id: node.id,
      },
    })
  })
}

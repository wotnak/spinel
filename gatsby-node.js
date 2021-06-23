const path = require(`path`)
const slash = require(`slash`)
const cheerio = require(`cheerio`)

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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions;
  createFieldExtension({
    name: "content",
    extend: extendContentField,
  });

  const typeDefs = `
    type WpPost implements Node {
      toc: JSON
      content: String @content
    }
  `;
  createTypes(typeDefs);
};

exports.createResolvers = ({ createResolvers, schema }) =>
  createResolvers({
    WpPost: {
      toc: {
        resolve: createTableOfContents,
      },
    },
  });


const createTableOfContents = async (source, args, context, info) => {
  const $ = cheerio.load(source.content)
  const titles = $('h2,h3,h4,h5')
  const getUniqueId = UniqueId()

  const headings = Array.from(titles).map(title => {
    const depth = parseInt($(title).prop('tagName').substr(1), 10)
    const id = createId($, title)
    return { url: `#${getUniqueId(id)}`, title: $(title).text(), depth }
  })

  const reduced = groupHeadings(0, [], headings)
  return { items: reduced }
}

const extendContentField = (options, prevFieldConfig) => {
  return {
    resolve(source) {
      const $ = cheerio.load(source.content)
      const titles = $('h2,h3,h4,h5')
      const getUniqueId = UniqueId()
      Array.from(titles).forEach(title => {
        const id = createId($, title)
        $(title).attr('id', getUniqueId(id))
      })

      return $('body').html()
    },
  }
}

function createId($, title) {
  let id = $(title).attr('id')

  if (!id) {
    id = $(title)
      .text()
      .toLowerCase()
      .replace('ą', 'a')
      .replace('ę', 'e')
      .replace('ż', 'z')
      .replace('ź', 'z')
      .replace('ć', 'c')
      .replace('ł', 'ł')
      .replace('ó', 'ó')
      .replace('ń', 'ń')
      .replace('ś', 's')
      .replace(/[^a-z_0-9]+/gi, '-')
      .replace(/-+/g, '-')
  }

  return id
}

function UniqueId() {
  const tempMap = {}
  return el => {
    if (tempMap[el]) {
      tempMap[el] = tempMap[el] + 1
      const result = `${el}-${tempMap[el]}`
      tempMap[result] = 1
      return result
    } else {
      tempMap[el] = 1
      return el
    }
  }
}

function groupHeadings(index, grouping, headings) {
  if (index < headings.length) {
    const nextHeading = headings[index]

    if (grouping.length) {
      const prevHeading = grouping.slice().pop()

      try {
        if (nextHeading.depth > prevHeading.depth) {
          prevHeading.items = prevHeading.items || []
          return groupHeadings(index, prevHeading.items, headings)
        } else if (nextHeading.depth == prevHeading.depth) {
          grouping.push({ ...nextHeading })
          return groupHeadings(++index, grouping, headings)
        } else {
          throw { index: index, heading: nextHeading }
        }
      } catch (higherHeading) {
        if (higherHeading.heading.depth == prevHeading.depth) {
          grouping.push({ ...higherHeading.heading })
          return groupHeadings(++higherHeading.index, grouping, headings)
        } else {
          throw higherHeading
        }
      }
    } else {
      grouping.push({ ...nextHeading })
      groupHeadings(++index, grouping, headings)
    }
  }

  return grouping
}

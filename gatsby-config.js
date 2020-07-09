const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `Spinel Hydrualika-Pneumatyka`,
    siteUrl: `https://spinel.pl`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: { path: path.join(__dirname, `assets`) },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Spinel Hydrualika-Pneumatyka`,
        short_name: `Spinel`,
        start_url: `/`,
        background_color: `#dadada`,
        theme_color: `#dadada`,
        display: `minimal-ui`,
        icon: `assets/icon.png`
      },
    },
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: `https://panel.spinel.pl/graphql`,
        verbose: true,
        develop: {
          hardCacheMediaFiles: true,
        },
        debug: {
          graphql: {
            writeQueriesToDisk: true,
          },
        },
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Source Sans Pro`,
            subsets: [`latin-ext`],
            variants: [`400`, `700`]
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-47556885-1`,
        head: true,
        anonymize: true,
        respectDNT: true,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://spinel.pl`,
      },
    },
    `gatsby-plugin-catch-links`,
  ],
}

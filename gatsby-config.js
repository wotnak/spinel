const path = require(`path`)

module.exports = {
  flags: {
    FAST_DEV: true,
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
  siteMetadata: {
    title: `Spinel Hydrualika-Pneumatyka`,
    siteUrl: `https://spinel.pl`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: { path: path.join(__dirname, `assets`) },
    },
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
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://panel.spinel.pl/graphql`,
        html: {
          useGatsbyImage: false,
        }
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `Source Sans Pro`,
              subsets: [`latin-ext`],
              variants: [`400`, `700`]
            },
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-47556885-1`,
        head: true,
        anonymize: true,
        respectDNT: true,
        defer: true,
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

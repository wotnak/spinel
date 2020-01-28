module.exports = {
  siteMetadata: {
    title: `Spinel Hydrualika-Pneumatyka`,
    siteUrl: `https://spinel.pl`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: `panel.spinel.pl`,
        protocol: `https`,
        hostingWPCOM: false,
        useACF: false,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Source Sans Pro:400,700`],
        display: "swap",
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
  ],
}

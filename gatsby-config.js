module.exports = {
  siteMetadata: {
    title: 'Gatsby Documentation Template',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/docs`,
        name: "markdown-pages",
      },
    },
    `gatsby-transformer-remark`,
  ],
}

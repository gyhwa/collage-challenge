/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
 require("dotenv").config({
   path: `.env.${process.env.NODE_ENV}`,
 })


module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -100
      }
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GA_TRACKING_ID,
        head: false,
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },

      },
    }
  ],
}

module.exports = {
  siteMetadata: {
    siteUrl: "https://stonks.gatsbyjs.io/",
    title: "Stonks",
    image: "/images/stonksman.png",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-antd",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Stonks",
        short_name: "Stonks",
        // start_url: '/',
        // background_color: '#f7f0eb',
        // theme_color: '#a2466c',
        // display: 'standalone',
        icon: "src/images/stonksman.png",
      },
    },
  ],
};

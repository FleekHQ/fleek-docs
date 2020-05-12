require("dotenv").config();
const queries = require("./src/utils/algolia");
const config = require("./config");
const plugins = [
  {
    resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /\.svg$/
      }
    }
  },
  // "gatsby-plugin-catch-links",
  "gatsby-plugin-sharp",
  {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve(`./src/templates/docs.js`)
    }
  },
  "gatsby-plugin-emotion",
  "gatsby-plugin-remove-trailing-slashes",
  "gatsby-plugin-react-helmet",
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "docs",
      path: `${__dirname}/content/`
    }
  },
  {
    resolve: 'gatsby-plugin-sitemap',
    options: {
      output: '/sitemap.xml',
      serialize: ({ site, allSitePage }) => allSitePage.edges.map((edge) => ({
        url: site.siteMetadata.siteUrl + edge.node.path.replace('/__GATSBY_IPFS_PATH_PREFIX__', ''),
        changefreq: 'daily',
        priority: 0.7
      }))
    }
  },
  {
    resolve: "gatsby-plugin-mdx",
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: "gatsby-remark-images",
          options: {
            maxWidth: 1035,
            sizeByPixelDensity: true
          }
        },
        {
          resolve: "gatsby-remark-copy-linked-files"
        }
      ],
      extensions: [".mdx", ".md"]
    }
  },
  {
    resolve: `gatsby-plugin-gtag`,
    options: {
      // your google analytics tracking id
      trackingId: config.gatsby.gaTrackingId,
      // Puts tracking script in the head instead of the body
      head: true,
      // enable ip anonymization
      anonymize: false
    }
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `gatsby-docs-Fleek`,
      short_name: `docs`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#ffffff`,
      display: `standalone`,
      icon: `src/components/images/FleekIcon.png`
    }
  },
   "gatsby-plugin-ipfs",
   `gatsby-plugin-netlify-cms`
];
// check and add algolia
if (
  config.header.search &&
  config.header.search.enabled &&
  config.header.search.algoliaAppId &&
  config.header.search.algoliaAdminKey
) {
  plugins.push({
    resolve: `gatsby-plugin-algolia`,
    options: {
      appId: config.header.search.algoliaAppId, // algolia application id
      apiKey: config.header.search.algoliaAdminKey, // algolia admin key to index
      queries,
      chunkSize: 10000 // default: 1000
    }
  });
}
// check and add pwa functionality
if (config.pwa && config.pwa.enabled && config.pwa.manifest) {
  plugins.push({
    resolve: `gatsby-plugin-manifest`,
    options: { ...config.pwa.manifest }
  });
  plugins.push({
    resolve: "gatsby-plugin-offline",
    options: {
      appendScript: require.resolve(`./src/custom-sw-code.js`)
    }
  });
} else {
  plugins.push("gatsby-plugin-remove-serviceworker");
}
module.exports = {
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    docsLocation: config.siteMetadata.docsLocation,
    ogImage: config.siteMetadata.ogImage,
    favicon: config.siteMetadata.favicon,
    logo: {
      link: config.header.logoLink ? config.header.logoLink : "/",
      image: config.header.logo
    }, // backwards compatible
    headerTitle: config.header.title,
    githubUrl: config.header.githubUrl,
    helpUrl: config.header.helpUrl,
    tweetText: config.header.tweetText,
    headerLinks: config.header.links,
    siteUrl: config.gatsby.siteUrl
  },
  // pathPrefix: config.gatsby.pathPrefix,
  plugins: plugins
};


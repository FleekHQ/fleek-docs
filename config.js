const config = {
  gatsby: {
    pathPrefix: "__GATSBY_IPFS_PATH_PREFIX__",
    siteUrl: "https://terminal.co",
    gaTrackingId: 'UA-144542192-2'
  },
  header: {
    logo: "",
    logoLink: "",
    title: "Terminal Documentation",
    githubUrl: "https://github.com/Terminal-Systems/terminal-docs",
    helpUrl: "",
    tweetText: "",
    links: [{ text: "", link: "" }],
    search: {
      enabled: false,
      indexName: "",
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY
    }
  },
  sidebar: {
    forcedNavOrder: ["/introduction", "SiteDeploys", "BuildConfigurations"],
    collapsedNav: [""],
    links: [{ text: "Terminal", link: "https://terminal.co" }],
    frontline: false,
    ignoreIndex: true
  },
  siteMetadata: {
    title: "Terminal Documentation",
    description: "Documentation built with mdx. Powering learn.hasura.io ",
    ogImage: null,
    docsLocation: "https://github.com/Terminal-Systems/terminal-docs",
    favicon: ""
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: "Gatsby Gitbook Starter",
      short_name: "GitbookStarter",
      start_url: "/",
      background_color: "#6b37Af",
      theme_color: "#6b37bf",
      display: "standalone",
      crossOrigin: "use-credentials",
      icons: [
        {
          src: "src/components/images/head-light-face-black.png", //Put Terminal Logo Here
          sizes: `512x512`,
          type: `image/png`
        }
      ]
    }
  }
};

module.exports = config;

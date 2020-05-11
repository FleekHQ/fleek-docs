const config = {
  gatsby: {
    pathPrefix: "__GATSBY_IPFS_PATH_PREFIX__",
    siteUrl: "https://docs.fleek.co",
    gaTrackingId: 'UA-144542192-2'
  },
  header: {
    logo: "",
    logoLink: "",
    title: "Fleek Documentation",
    githubUrl: "https://github.com/FleekHQ/fleek-docs",
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
    forcedNavOrder: ["/introduction", "Sites", "Storage"],
    forcedNavOrderSubItems: {
      "/Sites": [
        "/Sites/SiteDeploys",
        "/Sites/BuildConfigurations",
        "/Sites/DomainHTTPS",
        "/Sites/Troubleshooting",
        "/Sites/MonitorSites",
        ],
      "/Storage": [
        "/Storage/WebApp",
        "/Storage/ProgrammaticUsage",
      ],
    },
    collapsedNav: [""],
    links: [{ text: "Fleek", link: "https://Fleek.co" }],
    frontline: false,
    ignoreIndex: true
  },
  siteMetadata: {
    title: "Fleek Documentation",
    description: "Documentation built with mdx. Powering learn.hasura.io ",
    ogImage: null,
    docsLocation: "https://github.com/FleekHQ/fleek-docs",
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
          src: "src/components/images/FleekIcon.png", //Put Fleek Logo Here
          sizes: `512x512`,
          type: `image/png`
        }
      ]
    }
  }
};

module.exports = config;

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
    forcedNavOrder: ["Welcome", "Sites", "Storage"],
    forcedNavOrderSubItems: {
      "/Welcome": [
        "/Welcome/Introduction",
        "/Welcome/Products",
        "/Welcome/WhatIsIPFS",
        "/Welcome/IPFSGateway",
      ],
      "/Sites": [
        "/Sites/Overview",
        "/Sites/SiteDeployment",
        "/Sites/BuildConfigurations",
        "/Sites/SiteMonitoring",
        "/Sites/CustomDomains",
        "/Sites/ENSDomains",
        "/Sites/DNSLink",
        "/Sites/Frameworks",
        "/Sites/Troubleshooting",
      ],
      "/Storage": [
        "/Storage/StorageApp",
        "/Storage/FleekStorageJs",
        "/Storage/s3Integration",
      ],
    },
    forcedNavOrderThirdLevel: {
      "/Storage/StorageApp": [
        "/Storage/StorageApp/Overview",
        "/Storage/StorageApp/UploadFoldersAndFiles",
        "/Storage/StorageApp/ViewFoldersAndFiles",
      ],
      "/Storage/FleekStorageJs": [
        "/Storage/FleekStorageJs/Overview",
        "/Storage/FleekStorageJs/GettingApiKeys",
        "/Storage/FleekStorageJs/InstallingPackage",
        "/Storage/FleekStorageJs/get",
        "/Storage/FleekStorageJs/upload",
        "/Storage/FleekStorageJs/listFiles",
        "/Storage/FleekStorageJs/listBuckets",
        "/Storage/FleekStorageJs/getFileFromHash",
      ],
      "/Storage/s3Integration": [
        "/Storage/s3Integration/Overview",
        "/Storage/s3Integration/GettingApiKeys",
        "/Storage/s3Integration/CreatingAClientInstance",
        "/Storage/s3Integration/FetchingBuckets",
        "/Storage/s3Integration/ListingTheContentOfBucket",
        "/Storage/s3Integration/GettingPublicUrlOfFile",
        "/Storage/s3Integration/UploadingFiles",
        "/Storage/s3Integration/GettingTheIPFSHash",
        "/Storage/s3Integration/FetchingFileFromHash",
        "/Storage/s3Integration/AccessingFilesFromTerminal",
      ],
    },
    collapsedNav: ["/Sites", "/Storage", "/Storage/FleekStorageJs", "/Storage/s3Integration", "/Storage/StorageApp"],
    links: [
      { text: "", link: "https://twitter.com/FleekHQ", icon: 'twitter', tooltip: "Twitter" },
      { text: "", link: "https://app.slack.com/client/TT3NZ3XDY", icon: 'slack', tooltip: "Slack Community" },
      { text: "", link: "https://community.fleek.co/", icon: 'discourse', tooltip: "Forums" },
      { text: "", link:  "https://www.facebook.com/fleekhq/", icon: 'facebook', tooltip: "Facebook" },
      { text: "", link: "https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw", icon: 'youtube', tooltip: "Youtube Channel" },
      { text: "", link: "https://github.com/FleekHQ", icon: 'github', tooltip: "Github" },
      { text: "", link: "https://blog.fleek.co", icon: 'fleek', tooltip: "Fleek Blog"},

    ],
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

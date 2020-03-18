---
name: Build Configurations
---

# Common Configurations

- **JavaScript Single Page Applications (SPA's)**
  - Javascript SPA’s generally have a build script defined in the `package.json` file. Simply set the build command to

`npm run [BUILD_SCRIPT]` or `yarn [BUILD_SCRIPT]` depending on your preferred dependency manager. \* You will also have to define the publish directory, which is generally `dist` but can sometimes vary.

- **MonoRepos**

If your codebase works as a monorepo, you can set up your deploy to point at a specific base directory in your code base. When you configure the base directory Terminal will use the base directory as the primary or root directory and build your site from there.

- **Gatsby**

Similar to the configuration for Javascript SPA's, set the build command to `gastby build` and the publish directory to `public`

You will also need to have the `gatsby-plugin-ipfs` installed and configured in your gatsby-config file.

- **Hugo**

Set the following build settings:

1. **Build Settings / Build command:** `hugo` (or call `hugo` from something else)
2. **Build Settings / Publish directory:** `public`
3. **Docker Image:** `toschwarz/hugo-builder:latest`


### We are here to help

We are happy to help get your website up and running. Please feel free to reach out on our [website](https://terminal.co), in our [Community Chat](https://join.slack.com/t/terminal-public/shared_invite/enQtOTM1MjQ3NTExMDU3LTNkYjU1ZGJhZGUyYjgwN2I3OThjY2U5OThlMGY2MGY0OGYxMDI1OWIwMTMwYzViZGY4ZGU0NDA0YmY4ZjVhOTg), on [Twitter](https://twitter.com/terminaldotco), or at support@terminal.co

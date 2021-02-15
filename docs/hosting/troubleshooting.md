---
date: "1"

---
# Troubleshooting

## Site is not loading properly via IPFS gateway and shows invalid ipfs path error

Most likely, your assets are being loaded from an incorrect URL like `ipfs.io/my-image.jpg` instead of `ipfs.io/ipfs/$hash/my-image.jpg`. Therefore, this error should occur on IPFS gateways only.

You can verify that this is indeed the case by going to the developer tools of your web browser and looking at the request for you images, js and css files, etc... and seeing if they are being loaded.

If you want to support loading sites through an IPFS Gateway, you need to make sure your assets are loaded from relative paths. 

If the app has hard-coded absolute paths (e.g. in an `index.html` file), converting these to relative paths should enable proper resolution:

```html
<script src='./build/bundle.js'></script>
```

If the app is built using [Create React App](https://create-react-app.dev), adding a `homepage` field with the value `./` to the `package.json` file should fix the issue:

```json
{
  "homepage": "./",
  "dependencies": { ... },
  "scripts": { ... }
}
```

Using relative paths in React: <https://create-react-app.dev/docs/deployment/#building-for-relative-paths>

## My single-page application (SPA) breaks when changing routes via an IPFS gatway

IPFS gateways url are formatted in the following manner `ipfs.io/ipfs/$hash`. As such, the SPA might think that the root of the application is `ipfs.io` instead of `ipfs.io/ipfs/$hash`. For this reason, we recommend apps use hash routing to minimize such errors when using an IPFS gateway.

Adding a hash router in React: <https://reactrouter.com/web/api/HashRouter>

## Build Troubleshooting Tips

* If your build fails, the first thing you should check is if you can build your file locally in the development environment.
* If it builds successfully locally, then you should check if the dependencies installed by Fleek are the same as the ones being used locally. For example, you may need to specify the Node.js version
* The public directory is always relative to the base directory. So to use the `public` folder in the project root simply input `public` for the public directory field.

## Command not found

* If your build fails with the `command not found`, then your dependencies have not been installed. To install your dependencies, upload a configuration file such as `package.json` for NodeJS programs listing all of the required dependencies.

## Build fails with 'exit status 128'

* If your build is failing with `exit status 128`, this likely means that we no longer have access to your GitHub repository. Ensure that your repo is public or that you gave us access by signing in through GitHub when providing the link to the repo.

## Large files or sites

* Sites with many thousands of HTML files can often take a significant amount of time to deploy
    
## Enqueued builds

* System queue
    * This occurs when the number of builds across all of our customers exceeds our current network capacity. When this happens builds will be queued as they come in and be deployed when other builds finish
* Team queue
    * This occurs when the number of total builds across all of your sites exceeds the build limit. You can increase your concurrent builds by upgrading your account or by contacting support. If you have this issue, you can cancel other builds that may not be as important.

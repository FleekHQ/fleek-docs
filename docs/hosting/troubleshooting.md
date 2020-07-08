# Troubleshooting

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
* Our CDN does not support files of 10 MB or greater

## Enqueued builds

* System queue
    * This occurs when the number of builds across all of our customers exceeds our current network capacity. When this happens builds will be queued as they come in and be deployed when other builds finish
* Team queue
    * This occurs when the number of total builds across all of your sites exceeds the build limit. You can increase your concurrent builds by upgrading your account or by contacting support. If you have this issue, you can cancel other builds that may not be as important.
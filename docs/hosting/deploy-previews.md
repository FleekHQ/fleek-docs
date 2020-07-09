---
date: "1"

---
Deploy previews allow you to preview a deployment before pushing it to production. You can safely view what your site will look like before you merge the pull request.

It should come in handy when you want to make sure that everything is in order with the changes you want to make and avoid bad surprises due to unfortunate oversights.

#### Activating deploy previews
The feature must first be activated since it is deactivated by default. You can do so by going to the site's settings, clicking on `Build & Deploy` and interacting with the `Deploy Contexts` box.

![](https://fleekblog-team-bucket.storage.fleek.co/new-feature-pr-deploys/newFeaturePrPreviews/deploy-contexts.png)

#### Viewing deploy previews
To start a deploy preview, simply create a pull request to your production branch. The deploy preview will appear in the list of deploys of the site.

Click on the deploy tagged `Deploy Preview` to view it!

![](https://fleekblog-team-bucket.storage.fleek.co/new-feature-pr-deploys/newFeaturePrPreviews/list-of-deploys.png)

In addition, you are able to view the deploy preview right from the github page of your pull request. Very handy for developers wanting to see the changes resulting from a pull request!

![](https://fleekblog-team-bucket.storage.fleek.co/new-feature-pr-deploys/newFeaturePrPreviews/pr-preview.png)
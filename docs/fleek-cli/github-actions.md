---
date: "1"

---


![](imgs/deploy-action.png)

## Using Custom GitHub Actions

You can use custom GitHub actions if you want to replace the CLI's workflow that uses the ``site:deploy`` call, for your own GitHub CI. This assumes you have an existing repository codebase that you would like to deploy on Fleek. The flow would be as follows:

1. You run the CLI's ``site:init`` call on a built repository to create the necessary .fleek.json config file.
2. The updated, built, and initialized code is then pushed to GitHub to reflect changes.
3. You will have a previously setup GitHub action that executes the equivalent of the CLI's ``site:deploy`` call.
4. Then, upon push or your set up trigger, the GitHub Action will deploy your site to Fleek.

You can create your own GitHub Actions with any necessary additions to the sample we shared below, or use that sample itself (Deploy Action), available on the marketplace already.

## Sample Action: Deploy Action
We created a sample GitHub Action, our own Deploy Action! Useful for deploying your configured Fleek site publish directory. Deployed and ready on GitHub's action marketplace.

[**Visit the repository**](https://github.com/FleekHQ/action-deploy)

### How do you use it?
Create a `.github/workflows/deploy.yml` workflow file in your repository with the following configuration:

```yml
on: [push]

jobs:
  test-deploy:
    runs-on: ubuntu-latest
    name: A job to test the action-deploy action by deploying a test site
    steps:
      - uses: actions/checkout@v2
      - name: Deploy test site
        id: deploy
        uses: fleekhq/action-deploy@v1
        with:
          apiKey: ${{ secrets.FLEEK_API_KEY }}
      - name: Get the output url
        run: echo "Deploy url is ${{ steps.deploy.outputs.deployUrl }}"
```


## Configuration Options

The action can be configured with the following input arguments:

- apiKey (required) - Your Fleek scoped API key that has permission to deploy to the configured site. 

- workDir (optional) - The location of your .fleek.json config file. Defaults to repositories base directory.

- commitHash - (optional) - Optional git commit hash to deploy. Only useful for fleek sites linked to github.

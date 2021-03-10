---
date: "1"

---


![](imgs/fleekcli.png)

## Using Custom GitHub Actions

TBD

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

---
date: "1"

---


![](imgs/fleekcli.png)

The Fleek CLI is a command line interface that allows you to interact and control Fleek suite of tools and products. Currently, you can access to our **hosting**  products, or retrieve an API key to authenticate yourself when using the [Fleek Storage JS](https://docs.fleek.co/storage/fleek-storage-js/). It is in active development, and we will continue to add the rest of our suite's tools in the future.

### **Deployment Location**
> Currently IPFS is supported only for hosting deployments. For users looking to hosting on the Internet Computer, we recommend either using our Web UI (fleek.co) for a simple workflow, or DFINITY'S command line environment [(DFX)](https://sdk.dfinity.org/docs/developers-guide/cli-reference.html) as it supports further important customization related to your deployment on the Internet computer.

## Fleek CLI Overview
The Fleek CLI currently encompasses two main areas of Fleek.
- Hosting
- API key generation.

### Hosting
With the CLI, you can access Fleek's hosting products and deployment pipelines directly from your terminal, and open up new alternative use cases and workflows than the traditional flow we provide via our UI and web application.

The CLI enables a powerful new feature for hosting, for example:

**Deploying from Local Machine / Other Environments**
You can use the Fleek CLI to interact directly with the deployment/hosting workflow, and use a different enviroment other than our native GitHub integration (like local machine) to deploy your website or application.

**Using GitHub Actions on your Deployments**
The CLI also enables a second powerful developer feature, the use of custom GitHub actions on your Fleek deployments, letting you further customize your deployment workflow and making way for custom automations.

### API Key Generation
The CLI also provides an easy way to generate the necessary API keys to interact with our other interfaces, like the Fleek Storage JS, or any S3 compatible SDK (since Fleek provides an S3 interface as well)

### Command Categorization

Each command is categorized by topic, and has the following general structure:
```
fleek [topic]:[subcommand][options]
```
|Feature   	|Topic  	
|-:	|-	|
| Hosting 	|  site	|

### Getting Help/Suggestions on Each Topic
All topics on the CLI have their dedicated help messages with a brief description of what commands are available under that specific category. To trigger that message, run the following command:
```
fleek help [topic]
```
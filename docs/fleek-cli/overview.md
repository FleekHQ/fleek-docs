---
date: "1"

---


![](imgs/fleekcli.png)

The Fleek CLI is a command line interface that allows you to interact and control Fleek suite of tools and products. Currently, you can access to our **hosting**  products, or retrieve an API key to authenticate yourself when using the [Fleek Storage JS](https://docs.fleek.co/storage/fleek-storage-js/). It is in active development, and we will continue to add the rest of our suite's tools in the future.

### **Deployment Location**
> Currently IPFS is supported only for CLI deployments. For users looking to deploy to the Internet Computer, we recommend either using our Web UI (fleek.co) for a simple workflow, or DFINITY'S command line environment [(DFX)](https://sdk.dfinity.org/docs/developers-guide/cli-reference.html) if you are looking for granular customization of IC-specific settings related to your canister deployment.

---

<div class="prev-boxes-list">
  <a href="#fleek-cli-overview" class="prev-box">
    <h5>Overview</h5>
    <p>Learn About the CLI</p>
  </a>
  <a href="#getting-started-with-the-fleek-cli" class="prev-box">
    <h5>Getting Started</h5>
    <p>Install the CLI</p>
  </a>
    <a href="#sites" class="prev-box">
    <h5>Sites </h5>
    <p>Deploy from Local</p>
  </a>
    <a href="#storage" class="prev-box">
    <h5>Storage</h5>
    <p>Use Fleek Storage</p>
  </a>
</div>

## Fleek CLI Overview
The Fleek CLI currently encompasses two main areas of Fleek:

- Hosting
- API key generation

### Hosting
With the CLI, you can access Fleek's hosting products and deployment pipelines directly from your terminal, and open up new alternative use cases and workflows than the traditional flow we provide via our UI and web application.

The CLI enables a powerful new feature for hosting, for example:

**Deploying from Local Machine / Other Environments**
You can use the Fleek CLI to interact directly with the deployment/hosting workflow, and use a different environment other than our native GitHub integration (like local machine) to deploy your website or application.

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


## Getting Started with the Fleek CLI
### Installation
To install the CLI, run the following command:
```
npm install -g @fleekhq/fleek-cli
```
You can confirm that the CLI has been installed correctly by running the 'fleek help' command and receiving a full list of the currently supported subcommands.

### Logging in to Fleek
To use the CLI, you need to log into your Fleek account and authenticate yourself. To do so, run the following command that will prompt a browser window with a Fleek login, where you can do so:
```
fleek login
```
Once you are logged in, the CLI will store your authentication token.

### Retrieving Your API Key
To retrieve your API key, make sure you are logged into Fleek (see above), and then run the following command:
```
fleek whoami
```
When you do so, you will receive a response with the complete details of your current session/account, similar to the following:
```
{
  environment: 'prd',
  apiKey: '[[apikey]]',
  apiSecret: '[[apisecret]]',
  username: '[[username]]',
  _id: '[[id]]'
}
```

## Sites

You can use the Fleek CLI deploy static sites from local directories. **When you use the CLI** Fleek does not handle your site's building, and therefore you only need to initialize your **built directory/repository**, for Fleek to configure platform-specific settings.

This simplifies the CLI's usage greatly, as there are only two basic commands to be executed. ``site:init``, for initializing a local site with Fleek's settings, and ``site:deploy`` to deploy the changes live. 

#### **What does the flow look like?**
1. Create a local site repository
2. Build your repository locally
3. Initialize your built repo directory on the CLI
4. Deploy your built site to Fleek through the CLI

### Initialize and linking local site directory to Fleek

To initialize a Fleek site in your local directory run this command from your **previously built** repository directory.

```
fleek site:init
```

Once you do so, you will see a series of prompts guiding you through the process of selecting the Fleek team you want to work with, if you want to create a new site or use an existing site created through the CLI, and so on for Fleek to configure the right.

If successful, Fleek will create a ``.fleek.json`` file in your local directory with the final site/Fleek configurations for your future deployment.


### Deploying changes from your site

To deploy changes in your publish directory, run the following command in the directory of your built, and Fleek-initialized (via previous step) repository.

```
fleek site:deploy
```

This would package content in your configured public directory and deploy it to the linked site. That's it!

## Storage

### Accessing your bucket from code

In this example we are going to use AWS SDK for Node.JS. Note that AWS SDK is available for multiple other languages such as JavaScript, Go, C++, Python and Ruby, so this example should be adaptable to most existing applications.

First, make sure that you install the dependencies in your package.json file. You can do this by running:

`npm  init`

`npm install --save   aws-sdk `

Then, the following script outlines how to list your Fleek Storage buckets (replacing [[apiKey]] and [[apiSecret]] with the values obtained in the previous step).

    const AWS = require('aws-sdk');
   
    const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        accessKeyId: '[[apiKey]]',
        secretAccessKey: '[[apiSecret]]',
        endpoint: 'https://storageapi.fleek.co',
        region: 'us-east-1',
        s3ForcePathStyle: true
     });
 
    s3.listBuckets(function (err, data) {
        if (err) {
          console.log("Error when listing buckets", err);
        } else {
          console.log("Success when listing buckets", data);
        }
     });

Once you have your bucket name, you can fetch its contents using the following script:

    const params = {
         Bucket: "my-bucket",
         MaxKeys: 20
      };
 
    s3.listObjectsV2(params, function (err, data) {
         if (err) {
            console.log("Error when listing objects", err);
         } else {
            console.log("Success when listing objects", data);
         }
     });


Please read AWS SDK documentation for a full reference about other operations you can do on an S3 compatible API.

### Accessing from the Terminal
AWS also has tools for interacting with S3 from the terminal using AWS CLI. To do this, first install AWS CLI from https://aws.amazon.com/cli/

Then, configure the AWS CLI to point to Fleek Storage endpoint (again, replacing [[apiKey]] and [[apiSecret]] with the values obtained in the previous step).:

aws configure
AWS Access Key ID [None]: [[apiKey]]
AWS Secret Access Key [None]: [[apiSecret]]
Default region name [None]: us-east-1
Default output format [None]: ENTER

To list your buckets, run the following command:

`aws --endpoint-url https://storageapi.fleek.co s3 ls`

To list objects within a bucket, run:

`aws --endpoint-url https://storageapi.fleek.co s3 ls s3://my-bucket`
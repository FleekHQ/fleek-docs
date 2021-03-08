---
date: "1"

---


![](imgs/fleekcli.png)

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

You can use the Fleek CLI to link your local sites static
### Initialize and linking local site directory to fleek

To initialize a fleek site in your local directory run the command:

```
fleek site:init
```

Follow the prompts to either create a new site or link an existing site you have on fleek.

### Deploying changes from your site

To deploy changes in your publish directory, run:

```
fleek site:deploy
```

This would package content in your configured public directory and deploy it to the linked site.

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
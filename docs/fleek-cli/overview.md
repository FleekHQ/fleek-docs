---
date: "1"

---
<script>
  window.intercomSettings = {
    app_id: "ywevvpcu"
  };
</script>

<script>
// We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/ywevvpcu'
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/ywevvpcu';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
</script>


![](imgs/Filecoin-logo.jpg)

The Fleek CLI is a command line interface that allows you to interact and control Fleek suite of tools and products. Currently, you can access to our **Hosting** products, or retrieve an API key to authenticate yourself when using the [Fleek Storage JS](https://docs.fleek.co/storage/fleek-storage-js/). It is in active development, and we will continue to add the rest of our suite's tools in the future.

### **Technical Documentation**
> This is a general overview of the Fleek CLI, and an example of how to work with it. To get started on it, view the CLIs [complete documentation](https://fleekhq.github.io/space-sdk/docs/) page.

**You can find the repository and documentation here:**

* [Fleek CLI Github](https://github.com/FleekHQ/space-sdk)
* [Fleek CLI Documentation](https://fleekhq.github.io/space-sdk/docs/)

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
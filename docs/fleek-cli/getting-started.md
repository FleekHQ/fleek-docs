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
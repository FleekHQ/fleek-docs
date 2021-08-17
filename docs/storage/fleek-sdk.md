---
date: "1"

---
The Fleek SDK is a tool that allows you to interact programmatically with two features on the Fleek platform **IPFS Pinning** and **Internet Computer (IC) Storage**. It is an alternative to the Fleek Storage JS (the Storage JS uses S3/MinioDB to interact with Fleek's Storage/IPFS products, while the Fleek SDK doesn't).

---

## Internet Computer (IC) Storage

First, the **IC Storage** tool. Which you can use to deploy asset canisters on the Internet Computer (through Fleek's UI), which you then interact with using this SDK tool to store and fetch files on the Internet Computer. This product and the canister deployment flow can be found in the Fleek App under the **Canisters** tab.

## IPFS Direct Pinning

Secondly,  **IPFS Direct Pinning**. This is an alternative to using Fleek's Storage JS. When you store on Fleek's IPFS Storage via the UI, or the Storage JS, you interact with Fleek's IPFS infrastructure through an S3/MinioDB gateway that is on top of it, providing you with human readable live URLs and file metadata that are not native to IPFS. 

**Direct Pinning** is an alternative to this, and instead, using the **Fleek SDK** you can store/pin files directly to Fleek's IPFS nodes without going through that centralized layer (S3/MinioDB). 

Instead, you upload files directly using an IPFS client instance in the SDK, and only get the file's IPFS hash. It is a tradeoff approach, where you focus on an IPFS-only more decentralized option, which means your files will only be accessible through interfaces that resolve IPFS hashes (since our S3/MinioDB interface doesn't provide live Web2 URLs for resolving).

---

## Using the IC Storage & Pinning SDK

### Getting the Necessary API Key

You can also generate a new api key from the Web app at [app.fleek.co](https://app.fleek.co).

The api generator is located in the user settings.

![](imgs/user-settings.png)

The new keys can be generated in the api section by clicking on `Create API keys`.
Make sense to copy the secret somewhere because it is only visible once.

![](imgs/api-keys.png)

---

## Installation

Use the `npm` package manager to install it.

```bash
npm install @fleekhq/sdk
```

It can also be installed through yarn.

```bash
yarn add @fleekhq/sdk
```

## Importing

The SDK can be imported using an import statement.

```ts
import { Fleek } from '@fleekhq/sdk';
```

The SDK can also be imported using a require.

```js
const { Fleek } = require('@fleekhq/sdk');
```
---
## Initializing the SDK

You can initialize an instance only with `apiKey`, but if you want to leverage IC storage you also need to provide `assetCanisterId` property.

```ts
import { Fleek } from '@fleekhq/sdk';

const sdk = new Fleek({
  apiKey: 'your-api-key', // your Fleek API Key
  assetCanisterId: 'your-asset-canister-id',
});
```
---

## Pinning Files to IPFS

### ipfs()

Returns an instance of the IPFS client. For more information check out https://www.npmjs.com/package/ipfs-http-client.

```js
const ipfs = sdk.ipfs();
```

### Uploading data

```js
await sdk.ipfs().add(...);
```
----
## Storing on the Internet Computer
To start using IC Storage, you need to first **go to the Fleek app, visit the Canisters tab and deploy a new Asset Canister**. Fleek will automatically handle the deploy for you.

This asset canister will give you the proper **Canister ID** that you will need to input, together with the API Key **(see sections above)**, in the SDK. When you use the SDK, you are storing data on this deployed canister on the Internet Computer. You can have multiple canisters, and change the ID as you interact/store in them.

### Deploy an Asset Canister Through Fleek

Visit the app.fleek.co app, and log in with your account. Visit the new "Canisters" tab on the menu to the left.

**((Image))**

Here, use the button shown to quickly deploy a new asset canister. This is a "container" canister with the sole purpose of storing/serving files.

**((Image))**

All good? Perfect! You can now see the canister's details, among which is the **Canister ID**, save that because you are going to need it to use the Fleek SDK.

**((Image))**

### Initialize the SDK for IC Storage
To begin, initialize the Fleek SDK with an API Key, and the asset canister ID you got from the previous step:

```ts
import { Fleek } from '@fleekhq/sdk';

const sdk = new Fleek({
  apiKey: 'your-api-key', // your Fleek API Key
  assetCanisterId: 'your-asset-canister-id',
});
```

### Get Instance - assets()

Returns an instance of the IC storage client

```js
const assetStorage = sdk.assets();
```

### Uploading Data - store()

```js
await sdk.assets().store(key, data);
await sdk.assets().storeJson(key, { some: 'value' });
```

### Fetching - assets().get()

```js
const asset = await sdk.assets().get(key);
```

Returns the asset with the provided `key`. Returns `null` if not found.

### Listing - assets().listAll()

```js
const assets = await sdk.assets().listAll();
```

Returns a list of all assets. Returns `[]` if none.

### Listing with Prefix - assets().list()

```js
// list images for a specific user
const prefix = `images/${uid}`;
const assets = await sdk.assets().list(prefix);
```

Returns a list of all assets whose keys start with the provided `prefix`. Returns `[]` if none.

-----
## Authentication Options
There are multiple ways to authenticate to Fleek's endpoints when integrating these storage features into applications, or other projects.

### Private API Key

//// Vojtech examples

### Public API Key (Frontend)

//// Vojtech examples

### JWT Custom Token Authentication

//// Vojtech examples


----
## Application Example - NFTs on IPFS & IC with MetaMask

We've created an application example to showcase the power of these storage options, and the SDK!

In this case, we created an NFTs app where users can connect via Metamask, upload NFT content to IPFS and store the CID into an asset canister on the Internet Computer, under the path {ethAddress}/{ipfsHash}.json. Only ethAddress owner will be able to create/update files under that path!

This example also showcases an example of handling authentication with custom tokens provided by a lambda service.


**[See the live application, with live examples here!](https://bafybeigu677y3k6f7ttvpztewk5sbtla4z3tlxvhddzpghjch55ibz4cee.ipfs.dweb.link/)**


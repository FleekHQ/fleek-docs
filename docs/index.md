---
date: "1"

---
![](imgs/fleek-docs-group.png)

# 

Welcome to the Fleek documentation. Whether you are an expert or an absolute beginner, you'll find your answers here. Pick a starting point below, or use the search box to find documents matching your keywords.

Fleek makes it easy to build on Open Web protocols and a base layer infrastructure powered by them. Build and host your sites, apps, Dapps, and other services on trustless, permissionless, and open technologies focused on creating user-controlled, encrypted, private, p2p experiences easily. Build on the New Internet, and take the road to Web 3.0.

Packaging Open Web protocols like Dfinity, IPFS, Filecoin, Ethereum, GunDB, ENS, and more, in an ever-shifting stack of technologies that provide technical guarantees, no promises or trust isssues.

## Fleek Dfinity Site Hosting

With Fleek, you can seamlessly deploy **static sites** to Dfinity's Internet Computer. The entire deployment process, from front-end canister creation to cycle management is abstracted and automated so that you can build fast sites on Dfinity's trustless, permissionless, and open infrastructure in a couple clicks.

Furthermore, for the Dfinity ecosystem, we provide the following tools:

 * Fleek Dfinity Gateway.
 * Proxy/Service Worker Resolving Options.
 * Automatic Cycle Management.
 * Developer CLI/API with GitHub Action Support.


!!! info

    When you deploy a static site to Dfinity via Fleek, a front-end canister will be created, and updated automatically by Fleek with each deployment. You can choose to proxy your Dfinity site via a service worker, connecting directly to the IC, or Fleek's seamless proxy. Everything is deployed to our CDN as a performance front, with free SSL certificate and preview URL. Currently, Dfinity supports custom DNS domains, but ENS and other alternatives will be added in the future.

<div class="prev-boxes-list">
<a href="./dfinity-hosting/site-deployment/" class="prev-box">
<h5>Deploy to Dfinity</h5>
<p>Deploy to the Internet Computer</p>
</a>
<a href="./dfinity-hosting/domain-management/#canister-proxy" class="prev-box">
<h5>Build Configurations</h5>
<p>Get Build Settings for Popular Frameworks</p>
</a>
<a href="./dfinity-hosting/troubleshooting" class="prev-box">
<h5>Troubleshooting</h5>
<p>Common Issues and Fixes for Dfinity-hosted Sites</p>
</a>
</div>

## Fleek IPFS Hosting

From local development to global deployment, Fleek is everything you need to host fast, modern sites & apps on IPFS. All in one seamless workflow. Deploy your site in a few quick clicks onto IPFS with a built in CDN for blazing fast performance.

!!! info

    When you deploy on Fleek your site will have an IPFS hash and future automatic deployments will also update the IPFS hash of your site. Your site comes with a CDN, free SSL certificate, and a Fleek preview URL. You can add Custom Domains, ENS Domains, Configure Deploy Previews, and more.

<div class="prev-boxes-list">
<a href="./hosting/site-deployment/" class="prev-box">
<h5>Deploy</h5>
<p>Deploy in Few Quick Clicks</p>
</a>
<a href="./hosting/site-deployment/#common-frameworks" class="prev-box">
<h5>Build Configurations</h5>
<p>Get Build Settings for Popular Frameworks</p>
</a>
<a href="./tutorials/hosting" class="prev-box">
<h5>Frameworks</h5>
<p>Guides and Tutorials on Popular Frameworks</p>
</a>
<a href="./hosting/domain-management/#custom-domains" class="prev-box">
<h5>Custom Domain</h5>
<p>Add Root/Sub Domains To Your Site</p>
</a>
<a href="./hosting/domain-management/#ens-domains" class="prev-box">
<h5>ENS Domains</h5>
<p>Add ENS Domains To Your Site</p>
</a>
</div>

## Fleek Storage

Fleek storage is the easiest and most performant way to upload, pin, and fetch files on IPFS. For ease of use you can use the Fleek Application UI to manage files, our FleekJs SDK to easily interact programmatically, or our AWS S3 integration if you’re already using S3. You get the fastest IPFS file storage performance with an augmented CDN, File compression, and Image Resizing all packaged up with the Fleek Storage URLs (ex: example-bucket.storage.fleek.co). All files uploaded are published to DNS and can be viewed and referenced via the Fleek Storage URL and/or directly on any IPFS gateway.

<div class="prev-boxes-list">
<a href="./storage/storage-app/" class="prev-box">
<h5>Storage App UI</h5>
<p>Manage Files Through Pretty UI</p>
</a>
<a href="./storage/fleek-storage-js/" class="prev-box">
<h5>Storage Fleek JS</h5>
<p>Pin and Retrieve File Programmatically</p>
</a>
<a href="./storage/storage-aws-s3-integration/" class="prev-box">
<h5>AWS S3 Integration</h5>
<p>Integrate and Transfer from S3 Seamlessly</p>
</a>
</div>

## Space Daemon

The Space Daemon packages together IPFS, Textile Threads/Buckets, and Textile Powergate (Filecoin) into one easy to install and JS interface to make it easy to build peer to peer and privacy focused apps. Installing the Space Daemon is easy and comes with all the tools packaged together including IPFS and Textile nodes, and and also exposes gRPC methods specific to the features you want for your app including: File Upload (encrypted), File Sharing, Filecoin Markets, and User Controlled Data. You can access same methods using our JS client, so you don't need to worry about gRCP calls.

<div class="prev-boxes-list">
<a href="./space-daemon/getting-started/#installation" class="prev-box">
<h5>Daemon Installation</h5>
<p>Install the Space Daemon</p>
</a>
<a href="./space-daemon/getting-started/#crud-operations" class="prev-box">
<h5>Private File Operations</h5>
<p>Interact with File Commands</p>
</a>
<a href="./space-daemon/getting-started/#p2p-sharing" class="prev-box">
<h5>P2P Sharing</h5>
<p>Integrate Sharing Files Peer to Peer</p>
</a>
<a href="./space-daemon/getting-started/#identity" class="prev-box">
<h5>Identity Service</h5>
<p>From Fully Anonymous, to Teams, to Public Associations</p>
</a>
</div>

## Space SDK

The Space web application is built using the Space SDK, a modular JS library that packages the IPFS, Textile, Filecoin, and GunDB implementations necessary to build Open Web apps into easy to use commands and interfaces. It's open source and designed as a tool that anyone can plug into their websites or applications and implement Web3-enabled functionalities to make their projects more trustless and user-controlled. 

It's the successor of the Space Daemon, our desktop-based library. The Space SDK take the perks of the Daemon (encryption, user-controlled storage, peer-to-peer interactions, etc.) and makes them available on browser and mobile experiences. It's modular, and protocol agnostic, meaning you can use our own implementations (Textile hub for users, for example) or plug in your own layer and still leverage the SDK as an interface to manage it. For example, we plug in Torus as a seamless key management layer!

<div class="prev-boxes-list">
<a href="./space-sdk/overview/#Introduction" class="prev-box">
<h5>Overview</h5>
<p>Learn about the SDK</p>
</a>
<a href="./space-sdk/overview/#currently-available-apis" class="prev-box">
<h5>Available Modules</h5>
<p>View the current interfaces</p>
</a>
<a href="./space-sdk/overview/#the-space-sdk-versus-the-space-daemon" class="prev-box">
<h5>Space SDK vs Space Daemon</h5>
<p>What are the main differences?</p>
</a>
<a href="./space-sdk/overview/#installing-the-space-sdk" class="prev-box">
<h5>Installing the Space SDK</h5>
<p>How to get started with the SDK</p>
</a>
<a href="./space-sdk/overview/#migrating-from-the-space-daemon" class="prev-box">
<h5>Migrating from Space Daemon</h5>
<p>Learn the corresponding methods</p>
</a>
</div>

## IPFS Gateway

Fleek provides its own IPFS gateway so that anyone can access files on IPFS. Simply replace `HASH` with the IPFS hash (also called CID) of your file in the url below and navigate to the address with your web browser to access your file.

`https://ipfs.fleek.co/ipfs/HASH`

Also, you can easily download files from the gateway using the [getFileFromHash](/storage/fleek-storage-js/#getfilefromhash) command of [Fleek Storage Js](/storage/fleek-storage-js).

## Other Resources

Join our public [Slack](https://slack.fleek.co/), visit our [GitHub](https://github.com/FleekHQ), follow us on [Twitter](https://twitter.com/FleekHQ), and check out the [Blog](https://blog.fleek.co)!
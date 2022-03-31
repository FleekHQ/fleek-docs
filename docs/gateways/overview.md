---
date: "1"

---

Fleek works with several protocols and blockchain networks that are not directly connected to the Web2, or directly accessible over HTTP in a native way. 

When it comes to IPFS or Internet Computer hosted sites, apps, or files, the actual IPFS content hash address or canister url where the content is stored is not natively resolved by most browsers or served over HTTP.

To solve that, several "gateway" services exist that allow you to access those addresses over HTTP on your browser. Fleek is one provider for these gateways, and has its own IPFS gateway and Internet Computer gateway.

In the case of IPFS, it provides a faster and more performant way of accessing content over IPFS on browser than the native solution; and in the case of the Internet Computer **it is an open source alternative** to the DFINITY Foundation's main Internet Computer gateway, that anyone can leverage.

## Fleek's IPFS Gateway

Our IPFS gateway lives under the `ipfs.fleek.co` url. It provides an easy way to resolve IPFS hashes over http under the following format: `ipfs.fleek.co/ipfs/hash/`. Which, when filled, would look like:

`https://ipfs.fleek.co/ipfs/bafkreicgk6g2aysy544kgyxdvafnysi7wl2ko6wjhegzgjmij75a2tyf54`

Any IPFS hash can be resolved using the Fleek IPFS gateway, whether it is hosted through Fleek or not. This gateway **directly fetches the information on IPFS**, meaning it will always display the exact content of the file on IPFS.

### Fleek's Edge & IPFS CDN
Aside from Fleek's main IPFS gateway, open to everyone using IPFS, there is a secondary IPFS resolving feature Fleek provides exclusively to its users.

Any file or site hosted on IPFS through Fleek is made immediately available over HTTP through **Fleek's Edge**, over the `siteA.on.fleek.co` path for hosted sites, or the `storageapi2.fleek.co` path in the case of specific files stored on Fleek. When you host a new site, that is the url we utilize to give your site a random, and ready to use accessible URL! Files are also available on a user's specific bucket url: `[bucketName].s3.fleek.co` (e.g.`https://flk-team-bucket.s3.fleek.co/filename` ).


**Why does Fleek use this to serve IPFS content?**
We have built the Fleek edge to add CDN perks and speed improvements that are not native to IPFS, increasing the content delivery speed by up to 10x:

- Built-in pinning orchestration
- Automatic compression
- Automatic image resizing


## Fleek's Internet Computer Gateway and Proxy

For sites hosted on the Internet Computer through Fleek, **we use the Internet Computer's main gateway and proxy service, built by the DFINITY foundation.**

However, we still have created the Fleek Internet Computer Gateway (ic.fleek.co)! as open source alternative to the main IC gateway portal, that anyone can leverage to access their canisters over HTTP.

[Visit the Gateways/Proxy Repo](https://github.com/FleekHQ/ic-proxy)

**How can you do so?** It's simple, use your Canister ID and replace it on the following url [CANISTER_ID].ic.fleek.co. For example, it could look like this:

 `https://x4ytk-6yaaa-aaaab-qaiqq-cai.ic.fleek.co/`


Again, **anyone can use this gateway with their IC canisters**. They don't have to be Fleek hosted for you to paste the Canister ID and access them via HTTP on our gateway.

## The Gateway's Proxy and Service Workers
Before we transitioned to using the main IC Gateway for resolving sites on Fleek, we utilized the Fleek IC Gateway for **canister proxying**. This is no longer the case, but we leave this **information available as an open source resource**. In a nutshell, our IC gateway provided two ways the visitor's request can be translated so that they receive your website's content from your canister on the IC.

1. Using Fleek's seamless proxy (more centralized, but no loading state)
2. Using Fleek's service workers (less centralized, initial loading state)


![](imgs/service-worker.jpeg)


### The Proxy Option
The initial request will hit the gateway's servers. **If you have our proxy enabled** (default option), the gateway will translate the visitor's request, proxy to the Internet computer, and return the data from the website's Canister to the visitor. This is done seamlessly, without loading screens, but it does mean that **the gateway acts as a constant intermediary** between the user and the IC.

### The Service Workers Option

If you select to use the **service workers**, **only the initial request will hit the Gateway**. In this case, it will return a bootstrap script that registers a service worker on the user's browser that connects the user directly to the Internet Computer, forcing a refresh and fetching all content/requests directly from the IC from that point forward. 

When you use this method, users see an initial **loading animation** while the service worker is registered. This loading state only happens once -as the worker is registered- and all future visits should be as seamless as the proxy, but **without middleman**.

An additional perk of our service worker solution is that, compared to alternative implementations that seek to avoid middlemen handling requests constantly, **it is much more performant.** 

### Proxy, Default Path for Bots and Crawlers

Another nifty tool of this IC Gateway is that it is bot-friendly! It is important that your sites on the Internet Computer are not only crawlable but search engines, but their metadata is readable and enables things like link previews (when shared on social, for example).

When the gateway identifies bot or non-human traffic, it **automatically sends them through the Proxy** to ensure all these important things work perfectly on your website.


### Using Our Internet Computer Gateway to Redirect Canisters
Finally, you can also force your own IC Canisters to resolve using this open source Gateway, redirecting all traffic from the default provider to Fleek's, if you prefer its performance or usability. This, like the gateway itself, is not limited to Fleek-hosted canisters. Any canister can override their settings to **redirect to Fleek's Gateway url**

For example, you can have a basic Create React App (CRA), then add [these files](https://gist.github.com/studna/f2e496b7385500fadcbfb0f3ad78379a) and use 

`dfx deploy --network ic`

After it is deployed, you will be done and set to visit/redirect to the Fleek Gateway's version of the URL to access the canister.
---
date: "1"

---
# Fleek's Internet Computer Gateway and Proxy

We created the Fleek Internet Computer Gateway (ic.fleek.co)! An open source alternative to the main IC gateway portal into the Internet Computer that anyone can leverage to access their canisters over HTTP.

[Visit the Gateways/Proxy Repo](https://github.com/FleekHQ/ic-proxy)

**How can you do so?** It's simple, use your Canister ID and replace it on the following url [CANISTER_ID].ic.fleek.co. For example, it could look like this:

 `https://x4ytk-6yaaa-aaaab-qaiqq-cai.ic.fleek.co/`


Again, **anyone can use this gateway with their IC canisters**. They don't have to be Fleek hosted for you to paste the Canister ID and access them via HTTP on our gateway.

## The Gateway's Proxy and Service Workers
Before we transitioned to using the main IC Gateway for resolving sites on Fleek, we utilized the Fleek IC Gateway for **canister proxying**. This is no longer the case, but we leave this **information available as an open source resource**. In a nutshell, our IC gateway provided two ways the visitor's request can be translated so that they receive your website's content from your canister on the IC.

1. Using Fleek's seamless proxy (more centralized, but no loading state)
2. Using Fleek's service workers (less centralized, initial loading state)

!!! info

    As of May 2021; Fleek has released hosting on DFINITY's Mainnet, and now utilizes DFINITY's Main Internet Computer Gateway solution. Therefore, these options are no longer available in the Fleek app, but still are available as an open source resource!

![](imgs/service-worker.jpeg)


### Fleek's Proxy Option
The initial request will hit our servers (the Gateway). **If you have our proxy enabled** (default option), Fleek will translate the visitor's request, proxy to the Internet computer, and return the data from the website's Canister to the visitor. This is done seamlessly, without loading screens, but it does mean that **Fleek acts as a constant intermediary** between the user and the IC.

### Fleek's Service Workers Option

If you select to use our **service workers**, **only the initial request will hit the Gateway**. In this case, it will return a bootstrap script that registers a service worker on the user's browser that connects the user directly to the Internet Computer, forcing a refresh and fetching all content/requests directly from the IC from that point forward. 

When you use this method, users see an initial **loading animation** while the service worker is registered. This loading state only happens once -as the worker is registered- and all future visits should be as seamless as the proxy, but **without middleman**.

An additional perk of our service worker solution is that, compared to alternative implementations that seek to avoid middlemen handling requests constantly, **it is much more performant.** 

### Proxy, Default Path for Bots and Crawlers

Another nifty tool of the Fleek IC Gateway is that it is bot-friendly! It is important that your sites on the Internet Computer are not only crawlable but search engines, but their metadata is readable and enables things like link previews (when shared on social, for example). When Fleek's gateway identifies bot or non-human traffic, it **automatically sends them through the Proxy** to ensure all these important things work perfectly on your website.


### Using Our Internet Computer Gateway to Redirect Canisters
Finally, you can also force your own IC Canisters to resolve using the Fleek Gateway, redirecting all traffic from the default provider to Fleek's, if you prefer its performance or usability. This, like the gateway itself, is not limited to Fleek-hosted canisters. Any canister can override their settings to **redirect to Fleek's Gateway url**

For example, you can have a basic Create React App (CRA), then add [these files](https://gist.github.com/studna/f2e496b7385500fadcbfb0f3ad78379a) and use 

`dfx deploy --network ic`

After it is deployed, you will be done and set to visit/redirect to the Fleek Gateway's version of the URL to access the canister.
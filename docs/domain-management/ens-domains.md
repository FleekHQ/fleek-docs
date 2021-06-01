---
date: "1"

---
# ENS Domains

You can easily point an [Ethereum Name Service](https://ens.domains/) (ENS) domain to your **IPFS site** and have the content automatically update for future deployments. The benefit of ENS domains is that they are decentralized and trustless, running on the Ethereum blockchain network through smart contracts. 

It's important to note that, for a user to **resolve/visit an ENS domain** they will need to have a compatible provider/browser installed that is able to resolve them. **Using the MetaMask browser extension is one option**, as it resolves .eth domains.

!!! info

    Ethereum Name Service (ENS) domains are only compatible with IPFS sites at the moment. We are exploring ways to bring ENS to Internet Computer hosted sites in the future!

### Deploying

Once your app is deployed on Fleek, go to the settings page in the left-hand bar menu and click `Domain Management`. Scrolling a bit would land you on the section that says `ENS`

![](imgs/ens1.png)


### Adding ENS Domain

Click Add ENS to add your ENS domain. Input your domain to verify it and add it. If the domain does not belong to anyone you will be redirected to the [ENS Dashboard](https://app.ens.domains) to buy it.

!!! note
    Your domain will appear in the settings page and can also be deleted from there.

![](imgs/ens2.png)

### Set the Content Hash

Once you add your first ENS domain, you need to trigger one transaction through an Ethereum Web3 provider, such as [Metamask](https://metamask.io/). If using Metamask, a popup will appear asking to connect.

![](imgs/setipns.png)

This transaction sets the initial content hash / IPNS address that Fleek will automatically update on your ENS domain upon each deployment to refresh the content to the latest commit.

![](imgs/ipns-record.png)

**Previously, when Fleek didn't use IPNS**, Fleek was set as the controller of the ENS domain to modify the IPFS content hash manually each time. Now, using IPNS, that is not necessary and only one transaction is needed.

If the domain is using the old ENS resolver, you will be prompted to migrate to the latest resolver. By clicking on the `Migrate` button, you will be redirected to the [ENS Dashboard](https://app.ens.domains) to complete the migration.

![](imgs/ens4.png)

On the Settings section, the domain will show that the Ethereum transaction is pending confirmation. Upon confirmation, the ENS domain will have been successfully added to Fleek. 


### Review Your ENS Site with eth.link, MetaMask, or Other Options.

If you’re using an ENS-compatible browser, like [Brave](https://brave.com/), or if you have the [MetaMask](https://metamask.io/) extension installed like in the GIF above, you can just type your address in the search bar “address.eth/” (don’t forget the “/”) and it should be automatically resolved: fleekhq.eth/

**Using eth.link**
If you have none of those, you can always append the “.link” suffix after your domain to visit your IPFS+ENS website on any browser, thanks to a service made available by ENS and Cloudflare that makes all the .eth domains accessible via traditional DNS addresses. Anyone can visit and resolve your site. [Visit the ENS app with .link!](http://ens.eth.link/) 

**All of these are third-party resolving options** you, or anyone, can use to visit your site using .eth ENS domains. Be aware that these are non-Fleek platforms. If your ENS record is configured properly, and you experience an issue on any of these gateways, contact that specific provider.
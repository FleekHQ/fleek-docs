---
date: "1"

---
# Troubleshooting Custom Domains

## Troubleshooting Custom DNS Domains & DNS Record Updates
### I have a site with a custom DNS domain, and it is not working!

The first thing you can check is if your site is visible on the **"Verify on IPFS"** link on your Fleek dashboard. Visit your Fleek dashboard (the hosting tab) and select your affected site to find this button. See the gif below for a reference.

![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/verify-ipfs.gif)

Can you access your site via the IPFS link? Then the most possible scenario is **you're using our old DNS configuration and need to upgrade**. Follow the steps [on this documentation](https://docs.fleek.co/hosting/domain-management/#upgrading-to-new-dns-configuration) to update your domain records.

Another quick way for verifying if this is the problem is visiting the **domain management tab** on your site and seeing if the "Upgrade DNS Configuration" message is present.

![](https://storageapi.fleek.co/fleek-team-bucket/Blog Inline/verify.png)

If that is the case, you will need to set new ANAME/ALIAS records for your main root domain, and CNAME record for your subdomains. **If you have DNSLINK** **activated**, you will also need to update those records as well to the new configuration.

![](https://storageapi.fleek.co/fleek-team-bucket/dns-space.png)

### What type of records will I need to set on my DNS provider to use a custom domain?

You will need to set an ANAME/ALIAS record for the root domain, and CNAME records for your subdomains (www or other subdomains). If you have DNSLINK activated, it will also ask you to configure a CNAME record.

ANAME and ALIAS are interchangeable terms, and you might see one platform name the record either way. In both cases, it would work.

### Can I set a custom domain using an IP address?

No, we no longer support configuring custom domains using IP addresses. We only work with ANAME/ALIAS and CNAME records. If you use Google Domains, there is an exception mentioned below.

### Can I use an A record instead of ANAME/ALIAS?

No. A records are not the same as ANAME/ALIAS, and trying to configure your DNS domain with one will fail the verification process in Fleek.

### What can I do if my provider doesn’t support ANAME/ALIAS records?

Some providers, like **Google Domains and GoDaddy** don't support ANAME/ALIAS records. You have two options to resolve this.

#### 1) Transfer your domain to a compatible provider.

If your Domain Registrar / DNS provider doesn't support ANAME/ALIAS records, you can **transfer** your domain to a different platform that does support them. Some services facilitate this, [like Namecheap](https://www.namecheap.com/domains/transfer/transfer-from-godaddy). But the transfer process varies, and **it can take time.**

#### 2) Change your domain's nameserver to Cloudflare. (Recommended)

This is our recommended solution. Instead of initiating a domain transfer process, you can instead **change your domain's** nameserver to **point to Cloudflare and manage your DNS settings in Cloudflare**.

Cloudflare supports ANAME/ALIAS records. They need to be set as CNAME in Cloudflare, but they are auto-detected, and work properly.

This **doesn't require you to transfer** your domain, it is quicker, and free.

### How do I change my domain's nameserver and use Cloudflare to set up my Fleek DNS records?

First things first. You need to sign up for a [free Cloudflare account](https://www.cloudflare.com/).

Cloudflare provides a detailed guide on how to configure your nameserver on your other providers to point to Cloudflare. Here is a [step-by-step guide](https://support.cloudflare.com/hc/en-us/articles/205195708-Changing-your-domain-nameservers-to-Cloudflare), with specific guides for all different DNS provider platforms (see the table at the bottom of this article).

Once you have **updated your domain's nameserver on your old provider to Cloudflare's**, you can start managing your DNS records from the DNS app in your Cloudflare account. [Here is a guide from Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360019093151-Managing-DNS-records-in-Cloudflare) on how to do so.

Ready to add your new Fleek DNS records in Cloudflare? **There are two important details you need to follow:**

1. ANAME/ALIAS records are set as CNAME on Cloudflare (Cloudflare will detect them)
2. When you set up a record on Cloudflare, disable the orange cloud (HTTP proxy).

It is important that you **disable the Orange Cloud** in all of the DNS records you set on Cloudflare for your Fleek sites/apps. If not, your custom domain will **fail verification** on Fleek. To turn it OFF, edit the record and click the orange cloud.

![](https://docs.fleek.co/internet-computer-hosting/imgs/orange.png)

This is because when the orange cloud is ON, Cloudflare proxies your site through their CDN. Fleek already uses BunnyCDN to handle custom domains, and provide DDOS protection and CDN benefits in speed, caching, and routing. So they are not compatible, but you won't miss the benefits!

**Remember to go back to Fleek** after setting your DNS records on Cloudflare, and click on the "Verify DNS configuration button" for each of the domains you configured to complete the process. It might take a couple minutes for your site to reflect the change.

![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/Group%205832.png)

### I set up my DNS records on Cloudflare, but it Fails verification?

Review the last step from the question above. It is important that you disable the **orange cloud** feature in Cloudflare's DNS app **for all your Fleek DNS records.** Fleek can't verify your domain if Cloudflare is proxying your domain to their CDN.

### I use Google Domains, and don't want to have to use Cloudflare.

There is a workaround for people using Google Domains that don't want to use Cloudflare. This trick could apply to other providers that offer domain forwarding to sub domain from apex domain.

Here is a a [detailed guide on how to do so](https://support.getshifter.io/en/articles/3080501-domain-forwarding-on-google-domains-zone-apex-naked-domain-to-www-prefixed-domain). The idea is that Google Domains doesn't support ANAME/ALIAS records for apex domains (domain.com). But what **you can do** on Google Domains is forward that apex domain to a sub domain (www.domain.com).

In Fleek, subdomains use CNAME records, therefore you could verify it doing this trick, making www. your main point of entry for your website.


## Troubleshooting ENS domains

### How can I verify my .eth domain was linked properly?
You can quickly test that the ENS domain is correctly synced with the IPFS hash of the current build by appending `.link` after the domain. EG: <https://fleekhq.eth.link>

### I can't access my ENS domain via my browser?
You must ensure that your browser is able to resolve ENS domains. You can test this functionality with Fleek's homepage: [fleek.eth/](https://fleek.eth/).

It doesn't work? Then your browser might not support ENS domain resolving natively.[ Here's a list of compatible browsers](https://medium.com/the-ethereum-name-service/all-the-ways-you-can-surf-the-decentralized-web-today-bf8e7a42fa27#:~:text=There%20are%20at%20least%20five,and%20Unstoppable%20Browser%20(desktop)). However,  **the easiest way to resolve and visit .eth websites** is installing the [MetaMask](https://metamask.io/) wallet browser extension, that adds support for ENS to any browser.

### I have a compatible browser, but my ENS doesn't work?
It's possible the link doesn't immediately work. Most browsers, if not all of them, will redirect the user to an IPFS gateway and it is possible that the content for that IPFS hash has not yet propagated to the gateway. Wait a few minutes if that is the case.

## Troubleshooting HNS Domains

### Why can't access my HNS site from any browser?
Handshake domains live on the Handshake blockchain, much like ENS names live on Ethereum, and are not yet fully supported/resolved but most browsers.

You can use [**hns.to**](https://hns.to/) to quickly verify that your new  site is up. hns.to is a Handshake resolver, you can use its search engine to find your site, or append at the end of your HNS domain name `my.site.hns.to` to view it over HTTP.

Another option is to use an **HNS compatible browser or extension**, [like PUMA](https://www.pumabrowser.com/), or the [LinkFrame extension](https://chrome.google.com/webstore/detail/linkframe/klcheodcjdbkbiljlcfiphagmkhbifmm?hl=en-US&authuser=0) for Chrome. 

If you want, you can also change your **devices' DNS** to point to HNS resolving ones, like [HDNS](https://www.hdns.io/); or go all the way and install **Handshake's node,** [**hds **](https://hsd-dev.org/)to resolve their domains trustlessly.

For more options, visit [Namebase's guide](https://learn.namebase.io/starting-from-zero/how-to-access-handshake-sites#level-3-dns) detailing all available options by technical level.
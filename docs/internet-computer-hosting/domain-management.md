---
date: "1"

---
### Custom Domains
 Upon deploying a site on Internet Computer hosted sites/apps, Fleek will automatically assign a domain name in the following way: [CANISTER_ID].ic.fleek.co. For example, it could look like this:

 `https://x4ytk-6yaaa-aaaab-qaiqq-cai.ic.fleek.co/`
 
This domain is created through Fleek's Internet Computer Gateway, our own open source transdimensional portal to the IC. With Fleek's IC Gateway, you can surface and access **any canister on the Internet Computer, not just Fleek-hosted ones**. Just replace the Canister ID on the URL with the desired canister, and you're ready.

But, aside from this auto-generated domain, on Fleek we allow users to point their IC-hosted sites to a custom domain of their choice.

## Adding a Custom Domain 

![](imgs/add-custom-domain.png)

1. Go to your Internet Computer hosted site's page and select `Add or register domain`
2. Enter the domain name that you would like to add
3. From here you will either have to confirm that you already own this domain or if you do not own the domain name and that it is available, you can buy it through Fleek.

### Verifying the Custom Domain
After adding the custom domain, it will appear in the site's settings under `Domain Management` > `Domains`.
![](imgs/checkdns.png)

The domain must be verified before it is linked to the site. To verify, click on the `Check DNS configuration` button. This will make a modal appear containing instructions to add the domain.

Follow the instructions in the modal. The steps to update the records might be slightly different depending on your domain name provider. We then must wait for the domain to be propagated before clicking on `Verify DNS configuration` on the modal.

To verify that the DNS is indeed propagated before clicking on the button, you can use a tool such as <https://dnschecker.org/>

![](imgs/verifydns.png)

If the verify dns was successfull, the domain name will become blue.
![](imgs/finished-add-domain.png)

## HNS Domains

With Fleek you can also add [Handshake](https://handshake.org/) (HNS) domain names from the Handshake protocol/blockchain. This alternative to DNS/ENS is a decentralized naming protocol in which you don't buy domains themselves, but Top Level Domains (TLDs) like .domain or .fleek.

![](imgs/hns.png)

You can then create domains inside those TLDs and use them just like DNS on your Fleek-hosted site, via the HNS flow. To buy a new domain name, go to [Namebase](https://www.namebase.io/).

### Adding HNS Domains

Visit the `Domain Management` after deploying a site on Fleek, and search for the `HNS` section. HNS works exactly like DNS in terms of the workflow you must complete to link it to your Fleek site:

1. You add or buy your HNS domain
2. You verify it via a custom record
3. You redeploy your site

![](imgs/hnstest.png)

If you enter a domain that already has been purchased, you will be asked to confirm if it is yours; if it is not purchased yet, you will have the option to be redirected to Namebase to do so.

### Configuring Records

Finally, once you add or purchase a new HNS domain, you must do just like with DNS domain names: you need to configure a custom record so that it is properly linked and verified.

![](imgs/records.png)

You can use Namebase to do so, via their UI, or your own custom Nameserver to add the record that points to your app to your domain. That is all! Once you are done, you will have an HNS domain pointing to your Fleek-hosted project.

## ENS Domains on the Internet Computer
Currently, there is no native implementation of Ethereum Name Service domains on the Internet Computer. We are working together with the involved parties to make this a possibility soon, so stay tuned!
---
date: "1"

---
### Custom Domains
 Upon site creation, Fleek will automatically assign a domain name in the following way: [RANDOM_NAME].on.fleek.co.
 Of course, we allow users to point the site to a custom domain of their choice.

#### Adding a Custom Domain 

![](imgs/add-custom-domain.png)

1. Go to your site's page and select `Add or register domain`
2. Enter the domain you would like to add
3. From here you will either have to confirm that you already own this domain or if you do not own the domain name and that it is available, you can buy it through Fleek.

#### Verifying the Custom Domain
After adding the custom domain, it will appear in the site's settings under `Domain Management` > `Domains`.
![](imgs/checkdns.png)

The domain must be verified before it is linked to the site. To verify, click on the `Check DNS configuration` button. This will make a modal appear containing instructions to add the domain.
Follow the instructions in the modal. The steps to update the records might be slightly different depending on your domain name provider.
We then must wait for the domain to be propagated before clicing on `Verify DNS configuration` on the modal.

To verify that the DNS is indeed propagated before clicking on the button, you can use a tool such as <https://dnschecker.org/>

![](imgs/verifydns.png)

If the verify dns was successfull, the domain name will become blue.
![](imgs/finished-add-domain.png)

### ENS Domains

You can now easily point an ENS domain to your IPFS site and have the content automatically update for future deployments. Here is how to set up an ENS domain for your site:

#### Deploying

Once your app is deployed on Fleek, go to the settings page in the left-hand bar menu and click `Domain Management`. Scrolling a bit would land you on the section that says `ENS`

![](imgs/ens1.png)


#### Adding ENS Domain

Click Add ENS to add your ENS domain. Input your domain to verify it and add it. If the domain does not belong to anyone you will be redirected to the [ENS Dashboard](https://app.ens.domains) to buy it.

!!! note
    Your domain will appear in the settings page and can also be deleted from there.

![](imgs/ens2.png)

#### Set Fleek as the Controller through the UI

Fleek needs to be a controller of your ENS domain so we can automatically update your domain content hash when a site deployment succeeds. Click the `Set Fleek as Controller` button to set this up.

![](imgs/ens3.png)

If the domain is using the old ENS resolver, you will be prompted to migrate to the latest resolver. By clicking on the `Migrate` button, you will be redirected to the [ENS Dashboard](https://app.ens.domains) to complete the migration.

Finally, clicking on the `Set Fleek as controller` button will trigger a modal to connect an Ethereum web3 provider, such as [Metamask](https://metamask.io/). If using Metamask, a popup will appear asking to connect. After, another popup will appear to accept the Ethereum transaction to set Fleek as controller.

![](imgs/ens4.png)

On the Settings section, the domain will show that the Ethereum transaction is pending confirmation. Upon confirmation, the ENS domain will have been successfully added to Fleek. 

#### Set Fleek as Controller manually
The Fleek controller can also be set manually through the official [ENS frontend](https://app.ens.domains), or by interacting directly with the smart contracts.

The value for the controller address must be `0x31166ec8996643A35c2cf8cEbED980e26cd89D06`, which corresponds to the Ethereum address of Fleek's controller.

After manually setting the controller, adding the ENS through the app will work normally, except that Fleek will detect that the controller is already set and will complete the setup without executing an Ethereum transaction.

#### Troubleshooting Ens domains
* You can quickly test that the ENS domain is correctly synced with the IPFS hash of the current build by appending `.link` after the domain. EG: <https://fleekhq.eth.link>

* You must ensure that your browser is able to resolve ENS domains. You can test this functionality with Fleek's homepage: [fleek.eth/](https://fleek.eth/).

* It's possible the link doesn't immediately work. Most browsers, if not all of them, will redirect the user to an IPFS gateway and it is possible that the content for that IPFS hash has not yet propagated to the gateway. Wait a few minutes if that is the case.

### DNSLink

DNSLink allows the mapping of a domain name to an IPFS hash. Setting up DNSLink will allow you to use a domain name to access the latest version of your site through IPFS.

For example, accessing [ipfs.io/ipns/fleek.co](https://ipfs.io/ipns/fleek.co/) will point to the most recent IPFS hash of the Fleek homepage. The utility of this feature comes from having an unchanging link pointing to the most recent IPFS hash, which changes with each new build.

The [IPFS documentation](https://docs.ipfs.io/guides/concepts/dnslink/) extrapolates further on the subject.

#### Setting Up DNSLink
The option to set up DNSLink can be accessed by navigating from the site's Settings to Domain Management > Domains > Custom Domains and clicking on the three vertical dots.

![](imgs/dnslink_setup.png)

A popup will appear with directions on how to update the DNS records for DNSLink. The changes must be done through the domain registrar managing the domain, such as GoDaddy, BlueHost, HostGator, etc. The specific steps to update the records vary depending on which service you are using.

Furthermore, upon updating the records there is a delay of a few minutes before the new records are fully propagated on the internet. An online [dns checker](https://dnschecker.org/) is a very useful tool to verify that the changes are propagated fully.

Once the setup is complete, we can click on `Verify DNS configuration` to proceed.

![](imgs/dnslink_modal.png)

A blue chip with the text `DNS Link` next to the domain will indicate the successful integration of DNSLink.

![](imgs/dnslink_result.png)
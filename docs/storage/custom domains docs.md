

# Custom Storage API Domains

Upon creation of a Fleek.co Storage bucket, users are assigned a default API URL that looks something like: 'Storageapi.fleek.one` + bucket ID.

With Custom Storage API Domains, we're increasing the uptime, availability, and accessibility of these storage buckets by allowing existing Fleek.co storage users to add their own custom domains to map to their Fleek storage buckets.

!!! Important Info

We have recently deprecated (blog link) the ability for new storage buckets to be created on Fleek.co as a part of the sunsetting process the platform is going through. Users that don't already have a storage bucket with Fleek can sign up to be on the waitlist (link) for our new platform, Fleek.xyz.

## Add Custom Domain

Navigate to the storage tab, denoted by a `new` prompt and found in the vertical navigation bar of the Fleek.co app.

![](docs/storage/imgs/add-domain-#1.png)

### 1.  Click `Add a Custom Domain`

### 2.  Enter the Domain you want to map to your storage bucket -- make sure this is a domain you own.

### 3.  Click `Check DNS Configuration` and copy the URL that is in the format of 'bucket-id.b-cdn.net`, in order to let the custom domain know the location of your storage bucket.

![](docs/storage/imgs/dns-config.png)

## Verifying the Custom Domain

Through your domain provider, update the CNAME record to match the `Host` and `Value` records that the `DNS Configuration` modal provided. If you use a root domain, you will need to use a DNS provider that supports ANAME/ALIAS records.

Click `Verify DNS Configuration` in the `DNS Configuration` modal to verify changes.

If done properly Fleek will now be able to verify your domain, and your storage domain will change from the default `storageapi.fleek.one` URL to your custom domain + bucket ID. In the example below, we've successfully added `storage.mergeit.xyz` as the custom domain for a user with a bucket ID `e402cc35-7532-4131-...`.

This Fleek Storage bucket can now be accessed from `storage.mergeit.xyz/e402cc35-7532-4131-8ebe-dd4a5f506c5-bucket`.

![](docs/storage/imgs/final-merge-it-bucket.png)

All storage buckets will remain accessible from `storageapi.fleek.one/bucket-id`, even when a custom domain has been added. 

## Consuming Your New Endpoint Via the Fleek.co SDK

If you use the Fleek SDK to consume your storage bucket, please make sure you upgrade the `@fleekhq/fleek-storage-js` package to `version 1.0.23`. This new version allows you to input your custom storage domain as the endpoint.

After updating to `version 1.0.23`, you can now do the following to use the custom domain added in the Fleek app:

```js

const buckets = await fleekStorage.listBuckets({

`        `apiKey: 'your key',

`        `apiSecret: 'your secret,

`        `domain: "your custom domain"

});

```

Whether you use the Fleek SDK or just the domain URL, remember to update all references and application code to use your new custom domain.


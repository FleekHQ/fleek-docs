---
date: "1"

---
# Fleek's Dfinity IC Gateway

## Site is not loading properly via IPFS gateway and shows invalid ipfs path error

Most likely, your assets are being loaded from an incorrect URL like `ipfs.io/my-image.jpg` instead of `ipfs.io/ipfs/$hash/my-image.jpg`. Therefore, this error should occur on IPFS gateways only.

You can verify that this is indeed the case by going to the developer tools of your web browser and looking at the request for you images, js and css files, etc... and seeing if they are being loaded.

If you want to support loading sites through an IPFS Gateway, you need to make sure your assets are loaded from relative paths. 
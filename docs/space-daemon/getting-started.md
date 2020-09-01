---
date: "1"

---
### Installation

#### Download the daemon

First thing is go the [latest release](https://github.com/FleekHQ/space-daemon/releases/latest) of the daemon and download the binary version for your Operating System:

![Binary versions](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.26.35.png)

#### Run the daemon

Once you downloaded the daemon binary, open a new terminal window and go to the path where you placed the daemon and change its access permissions by doing:

```bash
chmod 755 space_binary_file
```

![Change permissions](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.35.32.png)

Then you can run daemon as any other normal binary file:

```bash
./your_binary_file
```

![Running daemon](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.35.51.png)

> If you get a warning window when you try to execute the daemon, please follow this instructions:

Click on cancel:

![Warning window](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.36.06.png)

Then go to your System Preferences/Security and Privacy and click `Allow Anyway`:

![System PReferences](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.36.34.png)

then try to execute the daemon again:

```bash
./your_binary_file
```

![Running daemon](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.35.51.png)

this time you will get a new warning window, click `Open`

![New warning window](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.36.51.png)

If everything goes well, you will see the daemon logs indicating that Daemon is ready

![Daemon Ready](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.37.06.png)

#### Download the client

If you are using NodeJS, you can install the Space Js client package so you can interact with the daemon using nice and simple JavaScript methods without worring about gRPC calls.

The Space Js client is built on top of [grpc-web](https://www.npmjs.com/package/grpc-web)

You can install the client on your project as any normal package, using `npm` or `yarn`:

```bash
npm install @fleekhq/space-client
```

or

```bash
yarn add @fleekhq/space-client
```

!!! info "Space Js client on server side"

    As space-client is built on top of [grpc-web](https://www.npmjs.com/package/grpc-web), if you want to use the client on server side you'll need to install XMLHttpRequest package:
    
    yarn add xmlhttprequest
    
    or
    
    npm install xmlhttprequest

#### Setup the client

You can import the client as any normal package.

Please have in mind that [space daemon](https://github.com/FleekHQ/space-daemon) is a service that runs on users desktops, that means that you just can connect through your localhost. You can't connect through a dns or try to connect to a [daemon](https://github.com/FleekHQ/space-daemon) running on a different machine.

```js
  import { SpaceClient } from '@fleekhq/space-client';

  // default port exposed by the daemon for client connection is 9998
  const client = new SpaceClient({
    url: `http://0.0.0.0:9998`,
  });

  ...
```

If you are running the client on the server-side, you need to declare `XMLHttpRequest` module as global. (this is because client is based on [grpc-web](https://www.npmjs.com/package/grpc-web), which is supposed to be used on client-side).

```js
  global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

  const { SpaceClient } = require('@fleekhq/space-client');

  // default port exposed by the daemon for client connection is 9998
  const client = new SpaceClient({
    url: `http://0.0.0.0:9998`,
  });

  ...
```

### CRUD Operations

#### Create client instance

> class SpaceClient(opts)

Use this class to create Space Js client instances able to interact with space-daemon

Options:

- `opts.url`: <em>**(string, required)**</em> space dameon url + port (`https://0.0.0.0:9998`)
- `opts.defaultBucket?`: <em>**(string, optional)**</em> change the default bucket. This value is used when you don't pass the bucket param on some of the methods below. if you don't pass this property, `personal` bucket is going to be used as default value (`personal` bucket is created by default when you run space-daemon for the first time).
- `opts.options?`: <em>**(object, optional)**</em> [grpc-web](https://github.com/grpc/grpc-web) client options.
- `opts.credentials?`: <em>**(object, optional)**</em> [grpc-web](https://github.com/grpc/grpc-web) client credentials.


```js
import { SpaceClient } from '@fleekhq/space-client';

const opts = {
  url: 'http://0.0.0.0:9998',
  defaultBucket: 'my-bucket',
};

const client = new SpaceClient(opts);
```


#### Create bucket

> .createBucket({ slug: string })

Creates a new bucket. Returns a Promise that resolves to the new bucket instance

```js
  client
    .createBucket({ slug: 'myNewBucket'})
    .then((res) => {
      const bucket = res.getBucket();

      console.log(bucket.getKey());
      console.log(bucket.getName());
      console.log(bucket.getPath());
      console.log(bucket.getCreatedat());
      console.log(bucket.getUpdatedat());
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.createBucket({ slug: 'my-bucket'});
    const bucket = res.getBucket();

    console.log(bucket.getName());
    ...
  };
```

#### List buckets

> `[WIP]` <em>.listBuckets()</em>
>
> this method is still not supported by [space-daemon](https://github.com/FleekHQ/space-daemon)

Returns all the buckets available

```js
  client
    .listBuckets()
    .then((res) => {
      const buckets = res.getBucketsList();
      
      buckets.forEach((bucket) => {
        console.log('key:', bucket.getKey());
        console.log('name:', bucket.getName());
        console.log('path:', bucket.getPath());
        console.log('createdAt:', bucket.getCreatedat());
        console.log('updatedAt:', bucket.getUpdatedat());
      });
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.listBuckets();
    const buckets = res.getBucketsList();

    ...
  };
```

#### Upload files/folders

> .addItems({ bucket?: string, targetPath: string, sourcePaths: string\[\] })

Add new items. Returns a readable stream to resolves the new items.
If you don't specify the `bucket` property, `client.defaultBucket` value is going to be used instead.

```js
  const stream = client.addItems({
    bucket: 'my-bucket',
    targetPath: '/', // path in the bucket to be saved
    sourcePaths: ['/path-to-my-folder-or-file-to-upload']
  });
    
  stream.on('data', (data) => {
    console.log('data: ', data);
  });
  
  stream.on('error', (error) => {
    console.error('error: ', error);
  });

  stream.on('end', () => {
    console.log('end');
  });
```

#### Create folders

> .createFolder({ path: string, bucket?: string })

Creates a new empty folder. Returns a Promise that resolves to the new folder.
If you don't specify the `bucket` property, `client.defaultBucket` value is going to be used instead.

```js
  client
    .createFolder({ path: '/', bucket: 'my-bucket' })
    .then(() => {
      console.log('folder created in path "/"');
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    await client.createFolder({ path: '/', bucket: 'my-bucket' });
  };
```

#### List a directory

> .listDirectory({ path: string, bucket?: string })

Returns a promise that resolves to list of Entry instances representing each folder and files present in the path directory.
If you don't specify the `bucket` property, `client.defaultBucket` value is going to be used instead.

```js
  client
    .listDirectory({ path: '/', bucket: 'my-bucket' })
    .then((res) => {
      const entries = res.getEntriesList();

      entries.forEach((entry) => {
        console.log(entry.getPath());
        console.log(entry.getName());
        console.log(entry.getIsdir());
        console.log(entry.getCreated());
        console.log(entry.getUpdated());
        console.log(entry.getIpfshash());
        console.log(entry.getSizeinbytes());
        console.log(entry.getFileextension());
      });
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.listDirectory({ path: '/', bucket: 'my-bucket' });
    const entries = res.getEntriesList();

    entries.forEach((entry) => {
      ...
    });
  };
```

#### List all the bucket directories/files

> .listDirectories({ bucket?: string })

Returns a Promise that resolves to list of Entry representing all the folders and files inside the bucket.
If you don't specify the `bucket` property, `client.defaultBucket` value is going to be used instead.

```js
  client
    .listDirectories({ bucket: 'my-bucket' })
    .then((res) => {
      const entries = res.getEntriesList();

      entries.forEach((entry) => {
        console.log(entry.getPath());
        console.log(entry.getName());
        console.log(entry.getIsdir());
        console.log(entry.getCreated());
        console.log(entry.getUpdated());
        console.log(entry.getIpfshash());
        console.log(entry.getSizeinbytes());
        console.log(entry.getFileextension());
      });
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.listDirectories({ bucket: 'my-bucket' });
    const entries = res.getEntriesList();

    entries.forEach((entry) => {
      ...
    });
  };
```

#### Open a file

> .openFile({ path: string, bucket?: string })

Copies the file referenced by the path arg to a temp folder on your machine and returns a Promise that resolves to the file location.
If you don't specify the `bucket` property, `client.defaultBucket` value is going to be used instead.

```js
const asyncFunc = async () => {
  const bucket = 'my-bucket';

  const dirRes = await client.listDirectories({
    bucket,
  });

  const entriesList = dirRes.getEntriesList();

  const openFileRes = await client.openFile({
    bucket,
    path: entriesList[0].getPath(),
  });

  const location = openFileRes.getLocation();
  console.log(location); // "/path/to/the/copied/file"
};
```

#### Subscribe to txl events

> .txlSubscribe()

Returns a ReadableStream that notifies when something changed on the bucket (data stream returns the Bucket name). NOTE: currently the payload will always be the bucket and then you would have to use the other functions to find the data that change, however we have an open issue to track this so we can return more granular information in the event payload.

```js
  const txlStream = client.txlSubscribe();

  txlStream.on('data', (res) => {
    const bucket = res.getBucket();
    console.log(bucket);
  });
```

#### Subscribe to buckets events

> .subscribe()

Returns a ReadableStream that notifies when something changed on the bucket (data stream returns the event type + the entry affected).
Event type can be one of `[ENTRY_ADDED, ENTRY_DELETED, ENTRY_UPDATED]`

```js
  const subscribeStream = client.subscribe();

  subscribeStream.on('data', (res) => {
    const eventType = res.getType();
    const entry = res.getEntry();

    console.log('eventType', eventType.toString());
    console.log('path', entry.getPath());
    console.log('name', entry.getName());
    console.log('isDir', entry.getIsdir());
    console.log('created', entry.getCreated());
    console.log('updated', entry.getUpdated());
    console.log('ipfsHash', entry.getIpfshash());
    console.log('sizeInBytes', entry.getSizeinbytes());
    console.log('fileExtension', entry.getFileextension());
  });
```

### Identity

#### Create username and email

> .createUsernameAndEmail({ username: string, email?: string })

Create a new username with/out email. Returns a Promise that resolves to the username

```js
  client
    .createUsernameAndEmail({ username: 'myusername' })
    .then(() => {
      console.log('username created');
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    await client.createUsernameAndEmail({ username: 'myusername', email: 'my-email@mydomain.com' });
  };
```

#### Get identity by username

> .getIdentityByUsername({ username: string, email?: string })

Get an indentity based on a username. Returns a Promise that resolves if a username already exists

```js
  client
    .getIdentityByUsername({ username: 'myusername' })
    .then((res) => {
      console.log(res.getIdentity());
    })
    .catch(() => {
      console.log('Username doesnt exists.');
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.getIdentityByUsername({ username: 'myusername' });
    
    console.log(res.getIdentity());
  };
```

### Sharing

#### Share a bucket

> .shareBucket({ bucket?: string })

Shares a bucket. Returns a promis that resolves to the threadInfo (required to join a bucket).
If you don't specify the `bucket` property, `client.defaultBucket` value is going to be used instead.

```js
  client
    .shareBucket({ bucket: 'my-bucket' })
    .then((res) => {
      const threadInfo = res.getThreadinfo();
      console.log('key:', threadInfo.getKey());
      console.log('addresses:', threadInfo.getAddressesList());
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.shareBucket({ bucket: 'my-bucket' });
    const threadInfo = res.getThreadinfo();
    ...
  };
```

#### Join a shared bucket

> joinBucket({ bucket?: string, threadInfo: { key: string, addresses: \[string\] } })

Joins a shared bucket
If you don't specify the `bucket` property, `client.defaultBucket` value is going to be used instead.

```js
  client
    .joinBucket({
      bucket: 'my-bucket',
      threadInfo: {
        key: 'my-key',
        addresses: ['address1', 'address2', 'address3'],
      },
    })
    .then((res) => {
      console.log('result', res.getResult());
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */
  
  const asyncFunc = async () => {
    const res = await client.joinBucket({
      bucket: 'my-bucket',
      threadInfo: {
        key: 'my-key',
        addresses: ['address1', 'address2', 'address3'],
      },
    });
    console.log('result', res.getResult());
    ...
  };
```

#### Share a bucket via email

> `[WIP]` <em>.shareBucketViaEmail({ bucket?: string, email: string })</em>
>
> this method is still not supported by [space-daemon](https://github.com/FleekHQ/space-daemon)

Shares a bucket via email.
If you don't specify the `bucket` property, `client.defaultBucket` value is going to be used instead.

```js
  client
    .shareBucketViaEmail({ bucket: 'my-bucket-slug', email: 'email@gmail.com' })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Asyn/Await */

  const asyncFunc = async () => {
    const res = await client.shareBucketViaEmail({
      bucket: 'my-bucket-slug',
      email: 'email@gmail.com',
    });
    
    console.log(res);
  };
```

#### Share a bucket via identity

> .shareBucketViaIdentity({ identityType: 'USERNAME' | 'EMAIL', identityValue: string, bucket?: string })

Shares a bucket via identity.
If you don't specify the `bucket` property, `client.defaultBucket` value is going to be used instead.

```js
  client
    .shareBucketViaIdentity({
      bucket: 'my-bucket-slug',
      identityType: 'USERNAME',
      identityValue: 'user123',
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.shareBucketViaIdentity({
      bucket: 'my-bucket-slug',
      identityType: 'USERNAME',
      identityValue: 'user123',
    });
    
    console.log(res);
  };
```

#### Generate a file share link

> `[WIP]` <em>.generateFileShareLink({ bucket?: string, filePath: string })</em>
>
> this method is still not supported by [space-daemon](https://github.com/FleekHQ/space-daemon)

Generates a share link.
If you don't specify the `bucket` property, `client.defaultBucket` value is going to be used instead.

```js
  client
    .generateFileShareLink({
      bucket: 'my-bucket-slug',
      filePath: 'path/to/file.js',
    })
    .then((res) => {
      console.log(res.getLink());
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.generateFileShareLink({
      bucket: 'my-bucket-slug',
      filePath: 'path/to/file.js',
    });
    
    console.log(res.getLink());
  };
```

### Backup

#### Backup keys by passphrase

> `[WIP]` <em>.backupKeysByPassphrase({ passphrase: string })</em>
>
> this method is still not supported by [space-daemon](https://github.com/FleekHQ/space-daemon)

Backup keys by passphrase

```js
  client
    .backupKeysByPassphrase({
      passphrase: 'my-passphrase',
    })
    .then(() => {
      console.log('keys backup');
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    await client.backupKeysByPassphrase({
      passphrase: 'my-passphrase',
    });
  };
```

#### Recovery keys by passphrase

> `[WIP]` <em>.recoverKeysByPassphrase({ passphrase: string })</em>
>
> this method is still not supported by [space-daemon](https://github.com/FleekHQ/space-daemon)

Recovery keys by passphrase

```js
  client
    .recoverKeysByPassphrase({
      passphrase: 'my-passphrase',
    })
    .then(() => {
      console.log('recovery keys');
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    await client.recoverKeysByPassphrase({
      passphrase: 'my-passphrase',
    });
  };
```

### Mount

#### Toggle fuse drive

> `[WIP]` <em>.toggleFuseDrive({ mountDrive: boolean })</em>
>
> this method is still not supported by [space-daemon](https://github.com/FleekHQ/space-daemon)

Mounts the fuse drive on your machine

```js
  client
    .toggleFuseDrive({
      mountDrive: true || false,
    })
    .then((res) => {
      console.log(res.getFusedrivemounted());
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.toggleFuseDrive({
      mountDrive: true || false,
    });
    
    console.log(res.getFusedrivemounted());
  };
```

#### Get fuse drive status

> `[WIP]` <em>.getFuseDriveStatus({})</em>
>
> this method is still not supported by [space-daemon](https://github.com/FleekHQ/space-daemon)

Get the current Fuse drive status

```js
  client
    .getFuseDriveStatus({})
    .then((res) => {
      console.log(res.getFusedrivemounted());
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.getFuseDriveStatus({});
    
    console.log(res.getFusedrivemounted());
  };
```

### Powergate

Currently, a Filecoin/Powergate implementation is available on the `filecoin` branch of the [Space Daemon](https://github.com/FleekHQ/space-daemon). Current releases do not contain this feature yet. Therefore, the binaries must be built from source as explained in the [Space Daemon README](https://github.com/FleekHQ/space-daemon#running-from-source).

The Powergate client can be started by running `make localnet-up` in the root folder.
After that, the binaries can be build and executed with the appropriate flags: `make && ./bin/space -filecoin -ipfsnode=false`.

The Space version of the Powergate client runs in localhost, port 6005 (`http://0.0.0.0:6005`).

The [Powergate Js Client](https://textileio.github.io/js-powergate-client/) is the recommended way to intereact with Filecoin. Our Space Client workshop includes [an example](https://github.com/FleekHQ/space-client-workshop/blob/master/src/components/Powergate/index.js) on how to upload a file to Filecoin.
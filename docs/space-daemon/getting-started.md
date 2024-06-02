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

- `opts.url`: <em>**(string, required)**</em> space daemon url + port (`https://0.0.0.0:9998`)
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
      console.log(bucket.getMembersList());
      console.log(bucket.getIsselectgroupbucket());
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
    .listBuckets({})
    .then((res) => {
      const buckets = res.getBucketsList();
      
      buckets.forEach((bucket) => {
        console.log('key:', bucket.getKey());
        console.log('name:', bucket.getName());
        console.log('path:', bucket.getPath());
        console.log('createdAt:', bucket.getCreatedat());
        console.log('updatedAt:', bucket.getUpdatedat());
        console.log('membersList:', bucket.getMembersList());
        console.log('isSelectGroupBucket:', bucket.getIsselectgroupbucket());
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

#### Remove Directory or File

> .removeDirOrFile({ path: string, bucket?: string })

Removes a file or a folder and its content. 
If you don't specify the `bucket` property, `client.defaultBucket` value is going to be used instead.

```js
  client
    .removeDirOrFile({ path: '/', bucket: 'my-bucket' })
    .then(() => {
      console.log('Deleted file or folder');
    })
    .catch((err) => {
      console.error(err);
    });
  /* Or using Async/Await */
  const asyncFunc = async () => {
    await client.removeDirOrFile({ path: '/', bucket: 'my-bucket' });
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
        console.log(entry.getIslocallyavailable());
        console.log(entry.getBackupcount());
        console.log(entry.getMembersList());
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
        console.log(entry.getIslocallyavailable());
        console.log(entry.getBackupcount());
        console.log(entry.getMembersList());
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

> .openFile({ path: string, bucket?: string, dbId?: string })

Copies the file referenced by the path arg to a temp folder on your machine and returns a Promise that resolves to the file location.
If you don't specify the `bucket` property, `client.defaultBucket` value is going to be used instead.

`dbId` should be used to open shared files. (you can get the `dbId` from `getSharedWithMeFiles` method).

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
Event type can be one of:

```protobuf
  enum EventType {
    ENTRY_ADDED = 0;
    ENTRY_DELETED = 1;
    ENTRY_UPDATED = 2;
    ENTRY_BACKUP_IN_PROGRESS = 3;
    ENTRY_BACKUP_READY = 4;
    ENTRY_RESTORE_IN_PROGRESS = 5;
    ENTRY_RESTORE_READY = 6;
    FOLDER_ADDED = 7;
    FOLDER_DELETED = 8;
    FOLDER_UPDATED = 9;
  }
```

example:

```js
  const subscribeStream = client.subscribe();

  subscribeStream.on('data', (res) => {
    const eventType = res.getType();
    const entry = res.getEntry();
    const bucket = res.getBucket();
    const dbId = res.getDbid();

    console.log('subscribe data:', {
      dbId,
      bucket,
      eventType: eventType.toString(),
      path: entry.getPath(),
      name: entry.getName(),
      isDir: entry.getIsdir(),
      created: entry.getCreated(),
      updated: entry.getUpdated(),
      ipfsHash: entry.getIpfshash(),
      sizeInBytes: entry.getSizeinbytes(),
      fileExtension: entry.getFileextension(),
    });
  });
```

#### Search files/folders

> .searchFiles({ query: string })

Search files/folder by name. Returns an EntryList with the results.

```js
  client
    .searchFiles({
      query: 'filename',
    })
    .then((res) => {
      const entriesList = res.getEntriesList();

      const entries = entriesList.map((item) => {
        const dbId = item.getDbid();
        const entry = item.getEntry();
        const bucket = item.getBucket();

        return {
          dbId,
          bucket,
          path: entry.getPath(),
          name: entry.getName(),
          isDir: entry.getIsdir(),
          created: entry.getCreated(),
          updated: entry.getUpdated(),
          ipfsHash: entry.getIpfshash(),
          sizeInBytes: entry.getSizeinbytes(),
          fileExtension: entry.getFileextension(),
          isLocallyAvailable: entry.getIslocallyavailable(),
          backupCount: entry.getBackupcount(),
          members: entry.getMembersList()
        };
      });

      console.log('entries res:', entries);
    })
    .catch((error) => {
      console.error(error);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.searchFiles({ query: 'filename' });
    
    const entriesList = res.getEntriesList();

    ...
  };

```

### Sharing

#### Share a bucket

> .shareBucket({ bucket?: string })

Shares a bucket. Returns a promise that resolves to the threadInfo (required to join a bucket).
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

#### Share Files via public key

> .shareFilesViaPublicKey({ publicKeys: [string], paths: [{ dbId?: string, bucket?: string, path: string }] })

Share files with other users via their public keys.

If you don't specify the `bucket` property, `client.defaultBucket` value is going to be used instead.
- `paths`:
  - `path`: path of the file that you want to share in your bucket.
  - `bucket`: (optional) source bucket
  - `dbId`: (optional) database id
- `publicKeys`: argument is an array of the public keys of the users that you want to share with.

```js
  client
    .shareFilesViaPublicKey({
      publicKeys: ['pubKey1', 'pubKey2', 'pubKey3'],
      paths: [{
        path: 'path1/file.jpeg',
        dbId: 'db-id-1',
        bucket: 'my-bucket',
      }],
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.shareFilesViaPublicKey({
      publicKeys: ['pubKey1', 'pubKey2', 'pubKey3'],
      paths: [{
        path: 'path1/file.jpeg',
        dbId: 'db-id-1',
        bucket: 'my-bucket',
      }],
    });

    console.log(res);
    ...
  };
```

#### Get files shared with me

> .getSharedWithMeFiles({ seek: string, limit: number })

Returns the list of files shared with me

```js
  client
    .getSharedWithMeFiles({
      seek: "seek_value",
      limit: 30,
    })
    .then((res) => {
      const result = {
        nextOffset: result.getNextoffset(),
        items: result.getItemsList().map((item) => {
          const entry = item.getEntry();

          return {
            dbId: item.getDbid(),
            bucket: item.getBucket(),
            path: entry.getEntrygetPath(),
            isDir: entry.getIsdir(),
            name: entry.getName(),
            sizeInBytes: entry.getSizeinbytes(),
            created: entry.getCreated(),
            updated: entry.getUpdated(),
            fileExtension: entry.getFileextension(),
            ipfsHash: entry.getIpfshash(),
            isLocallyAvailable: entry.getIslocallyavailable(),
            backupCount: entry.getBackupcount(),
            members: entry.getMembersList().map((member) => ({
              publicKey: member.getPublickey(),
            })),
          };
        }),
      };

      console.log(result);
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.getSharedWithMeFiles({
      seek: "seek_value",
      limit: 30,
    });

    console.log(res.getItemsList());
    ...
  };
```

#### Get files shared by me

> .getSharedByMeFiles({ seek: string, limit: number })

Returns the list of files shared by me

```js
  client
    .getSharedByMeFiles({
      seek: "seek_value",
      limit: 30,
    })
    .then((res) => {
      const result = {
        nextOffset: result.getNextoffset(),
        items: result.getItemsList().map((item) => {
          const entry = item.getEntry();

          return {
            dbId: item.getDbid(),
            bucket: item.getBucket(),
            path: entry.getEntrygetPath(),
            isDir: entry.getIsdir(),
            name: entry.getName(),
            sizeInBytes: entry.getSizeinbytes(),
            created: entry.getCreated(),
            updated: entry.getUpdated(),
            fileExtension: entry.getFileextension(),
            ipfsHash: entry.getIpfshash(),
            isLocallyAvailable: entry.getIslocallyavailable(),
            backupCount: entry.getBackupcount(),
            members: entry.getMembersList().map((member) => ({
              publicKey: member.getPublickey(),
            })),
          };
        }),
      };

      console.log(result);
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.getSharedByMeFiles({
      seek: "seek_value",
      limit: 30,
    });

    console.log(res.getItemsList());
    ...
  };
```

#### Get a list of the recently members that you shared with

> .getRecentlySharedWith()

Returns a list of the recently members that you shared with


```js
  client
    .getRecentlySharedWith()
    .then((res) => {
      const membersList = res.getMembersList();

      const members = membersList.map((member) => ({
        address: member.getAddress(),
        publicKey: member.getPublickey(),
      }));
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.getRecentlySharedWith();

    const membersList = res.getMembersList();
    ...
  };
```

#### Generate a file public link

> .generatePublicFileLink({ bucket?: string, password: string, itemPaths: [string], dbId: string })

Generates a sharing public link for the files specified.
If you don't specify the `bucket` property, `client.defaultBucket` value is going to be used instead.

```js
  client
    .generatePublicFileLink({
      dbId: 'db-id-string',
      bucket: 'my-bucket',
      password: '123asd',
      itemPaths: ['path/to/file1.txt', 'path/to/file2.txt'],
    })
    .then((res) => {
      const fileInfo = {
        link: res.getLink(),
        fileCid: res.getFilecid(),
      };

      console.log(fileInfo);
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.generatePublicFileLink({
      dbId: 'db-id-string',
      bucket: 'my-bucket',
      password: '123asd',
      itemPaths: ['path/to/file1.txt', 'path/to/file2.txt'],
    });

    const fileInfo = {
      link: res.getLink(),
      fileCid: res.getFilecid(),
    };

    ...
  };
```

#### Open a public file

> .openPublicFile({ fileCid: string, password: string, filename: string })

Open a file from a shared public link.

```js
  client
    .openPublicFile({
      fileCid: 'some-id',
      password: 'file-password',
      filename: 'some-filename',
    })
    .then((res) => {
      const location = res.getLocation();

      console.log(location);
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.openPublicFile({
      fileCid: 'some-id',
      fileKey: 'some-password',
      filename: 'some-filename',
    });

    res.getLocation()

    ...
  };
```

#### Subscribe to notifications

> .notificationSubscribe()
Returns a ReadableStream that notifies about new notifications.
Notifications are triggered upon another member's interaction with a shared file or bucket, for example if he attempts to add a new file to a shared bucket.

```js
  const notificationStream = client.notificationSubscribe();
  notificationStream.on('data', (res) => {
    const notification = res.getNotification();
    console.log(notification);
  });
```

#### Read Notification

> .readNotification({ ID: '1234' })

Mark a notification as read.

```js
  client
    .readNotification({ ID: '1234' })
    .then(() => {
      console.log('notification was marked as read');
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.readNotification({ ID: '1234' });

    console.log('notification was marked as read');
    ...
  };
```

#### Get notifications
> .getNotifications({ seek: string, limit: number })

Returns a list of notifications objects. Notifications objects represent just share file invitations for now.

```js
  client
    .getNotifications({ seek: 'some-value', limit: 20 })
    .then((res) => {
      const objectRes = {
        nextOffset: res.getNextoffset(),
        notifications: res.getNotificationsList().map((notification) => ({
          id: notification.getId(),
          body: notification.getBody(),
          type: notification.getType(),
          readAt: notification.getReadat(),
          subject: notification.getSubject(),
          createdAt: notification.getCreatedat(),
          relatedObject: notification.getRelatedobjectCase(),
        })),
      };

      console.log(objectRes);
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.getNotifications({ seek: 'some-value', limit: 20 });

    console.log(res);
    ...
  };
```

#### Set Notifications Last Seen At

> .setNotificationsLastSeenAt({ seek: string, limit: number })

Updates the timestamp which is returned by the `getNotifications()` method through calling `getLastseenat()`.
This timestamp can be used to track which notification has not yet been seen by the user.

```js
  client
    .setNotificationsLastSeenAt({ timestamp: 1598889151456 })
    .then(() => {
      console.log('Updated the notifications timestamp');
    }).catch((err) => {
        console.error(err);
      });
    /* Or using Async/Await */
    const asyncFunc = async () => {
      await client.setNotificationsLastSeenAt({ timestamp: 1598889151456 });
    };
```

#### Handle Files Invitation

> .handleFilesInvitation({ invitationID: string, accept: boolean })

This method is for accepting or rejecting an invitation to a sharing request of a file.

```js
  client
    .handleFilesInvitation({ invitationID: '123-123-123', accept: true })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
  /* Or using Async/Await */
  const asyncFunc = async () => {
    await client.handleFilesInvitation({ invitationID: '123-123-123', accept: true });
  };
```

### Backup

#### Toggle Bucket Backup

> toggleBucketBackup({ bucket: string, backup: boolean })

Toggles whether or not to back up the content of a bucket to Space.

```js
  client
    .toggleBucketBackup({ bucket: 'bucket-name', backup: true })
    .then(() => {
      console.log('bucket-name is backed up in Space!');
    })
    .catch((err) => {
      console.error(err);
    });
    
  /* Or using Async/Await */
  const asyncFunc = async () => {
    await client.toggleBucketBackup({ bucket: 'bucket-name', backup: true });   
    ...
  }
```  

#### Get Usage Info

> .getUsageInfo()

Fetches account storage usage info such as amount of space used locally and in Space, alongside bandwith quotas and limits. 

```js
  client
    .getUsageInfo()
    .then((usageInfoRes) => {
      const usageInfo = {
        localstorageused: usageInfoRes.getLocalstorageused(),
        localbandwidthused: usageInfoRes.getLocalbandwidthused(),
        spacestorageused: usageInfoRes.getSpacestorageused(),
        spacebandwidthused: usageInfoRes.getSpacebandwidthused(),
        usagequota: usageInfoRes.getUsagequota(),
      }
      console.log(usageInfo);
    })
    .catch((err) => {
      console.error(err);
    });
    
  /* Or using Async/Await */
  const asyncFunc = async () => {
    const usageInfoRes = await client.getUsageInfo();
    const usageInfo = {
      localstorageused: usageInfoRes.getLocalstorageused(),
      localbandwidthused: usageInfoRes.getLocalbandwidthused(),
      spacestorageused: usageInfoRes.getSpacestorageused(),
      spacebandwidthused: usageInfoRes.getSpacebandwidthused(),
      usagequota: usageInfoRes.getUsagequota(),
    }
    console.log(usageInfo);
  };
```

#### Get Public Key

> getPublicKey()

Get the current public key generated by the daemon and the hub auth token.

```js
  client
    .getPublicKey()
    .then((res) => {
      const publicKey = res.getPublickey();
      const hubAuthToken = res.getHubauthtoken();

      console.log('publicKey', publicKey);
      console.log('hubAuthToken', hubAuthToken);
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.getPublicKey();

    console.log('publicKey', res.getPublickey());
    console.log('hubAuthToken', res.getHubauthtoken());

    ...
  };
```

#### Get Stored Mnemonic

> getStoredMnemonic()

Get the stored mnemonic seed. 

```js
  client
    .getStoredMnemonic()
    .then((res) => {
      console.log('mnemonic', res.getMnemonic());
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.getMnemonic();

    console.log('mnemonic', res.getMnemonic());
    ...
  };
```

#### Get API Session Tokens

> getAPISessionTokens()

Get the current api session tokens.

```js
  client
    .getAPISessionTokens()
    .then((res) => {
      const hubToken = res.getHubtoken();
      const servicestoken = res.getServicestoken();

      console.log('hubToken', hubToken);
      console.log('servicestoken', servicestoken);
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.getAPISessionTokens();

    console.log('hubToken', res.getHubtoken());
    console.log('servicestoken', res.getServicestoken());

    ...
  };
```

#### Backup keys by passphrase

> .backupKeysByPassphrase({ uuid: string, passphrase: string, type: number })

Backup keys by a passphrase

```js
  client
    .backupKeysByPassphrase({
      uuid: 'user-uuid',
      passphrase: 'my-passphrase',
      type: 0, // 0 = PASSWORD; 1 = GOOGLE; 2 = TWITTER; 3 = EMAIL
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
      uuid: 'user-uuid',
      passphrase: 'my-passphrase',
      type: 0, // 0 = PASSWORD; 1 = GOOGLE; 2 = TWITTER; 3 = EMAIL
    });
  };
```

#### Recovery keys by passphrase

> .recoverKeysByPassphrase({ uuid: string, passphrase: string, type: number })

Recovery keys by passphrase

```js
  client
    .recoverKeysByPassphrase({
      uuid: 'user-uuid',
      passphrase: 'my-passphrase',
      type: 0, // 0 = PASSWORD; 1 = GOOGLE; 2 = TWITTER; 3 = EMAIL
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
      uuid: 'user-uuid',
      passphrase: 'my-passphrase',
      type: 0, // 0 = PASSWORD; 1 = GOOGLE; 2 = TWITTER; 3 = EMAIL
    });
  };
```
#### Test Keys Passphrase

> .testKeysPassphrase({ uuid: string, passphrase: string })

Test keys with passphrase

```js
  client
    .testKeysPassphrase({
      uuid: 'user-uuid',
      passphrase: 'my-passphrase',
    })
    .then(() => {
      console.log('test success');
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    await client.testKeysPassphrase({
      uuid: 'user-uuid',
      passphrase: 'my-passphrase',
    });
  };
```

#### Delete Key Pair

> .deleteKeyPair()

Deletes the Key Pair

```js
  client
    .deleteKeyPair()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */
  const asyncFunc = async () => {
    const res = await client.deleteKeyPair();

    console.log(res);
    ...
  };
```

#### Generate Key Pair With Force

> .generateKeyPairWithForce()

Generate key pair with force

```js
  client
    .generateKeyPairWithForce()
    .then(() => {
      console.log('keys generated');
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    await client.generateKeyPairWithForce();
  };
```

### Mount

#### Toggle fuse drive

> `[WIP]` <em>.toggleFuseDrive({ mountDrive: boolean })</em>
>
> this method is still not supported by [space-daemon](https://github.com/FleekHQ/space-daemon)

Fuse Status:
```protobuf
enum FuseState {
  UNSUPPORTED = 0;
  NOT_INSTALLED = 1;
  UNMOUNTED = 2;
  MOUNTED = 3;
}
```

Mounts the fuse drive on your machine

```js
  client
    .toggleFuseDrive({
      mountDrive: true || false,
    })
    .then((res) => {
      console.log(res.getState());
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.toggleFuseDrive({
      mountDrive: true || false,
    });
    
    console.log(res.getState());
  };
```

#### Get fuse drive status

> `[WIP]` <em>.getFuseDriveStatus({})</em>
>
> this method is still not supported by [space-daemon](https://github.com/FleekHQ/space-daemon)


Fuse Status:
```protobuf
enum FuseState {
  UNSUPPORTED = 0;
  NOT_INSTALLED = 1;
  UNMOUNTED = 2;
  MOUNTED = 3;
}
```

Get the current Fuse drive status

```js
  client
    .getFuseDriveStatus({})
    .then((res) => {
      console.log(res.getState());
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    const res = await client.getFuseDriveStatus({});
    
    console.log(res.getState());
  };
```

### Account

#### Delete Account

> deleteAccount()

Delete an account.

```js
  client
    .deleteAccount()
    .then(() => {
      console.log('account deleted');
    })
    .catch((err) => {
      console.error(err);
    });

  /* Or using Async/Await */

  const asyncFunc = async () => {
    await client.deleteAccount();

    console.log('account deleted');
  };
```


### Powergate

Currently, a Filecoin/Powergate implementation is available on the `filecoin` branch of the [Space Daemon](https://github.com/FleekHQ/space-daemon). Current releases do not contain this feature yet. Therefore, the binaries must be built from source as explained in the [Space Daemon README](https://github.com/FleekHQ/space-daemon#running-from-source).

The Powergate client can be started by running `make localnet-up` in the root folder.
After that, the binaries can be build and executed with the appropriate flags: `make && ./bin/space -filecoin -ipfsnode=false`.

The Space version of the Powergate client runs in localhost, port 6005 (`http://0.0.0.0:6005`).

The [Powergate Js Client](https://textileio.github.io/js-powergate-client/) is the recommended way to intereact with Filecoin. Our Space Client workshop includes [an example](https://github.com/FleekHQ/space-client-workshop/blob/master/src/components/Powergate/index.js) on how to upload a file to Filecoin.

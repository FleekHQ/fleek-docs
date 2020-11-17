---
date: "1"

---

### Security and Cryptography

### Security brief

When building the Space Daemon, our number one priority was ensuring everything is private and secure. There are many security layers stacked onto each other in order to make it secure from the moment a key is created to the one a file is shared.

In this section we detail the security measures taken in each of the following steps:

- Account key generation and storage
- Key backups
- File sharing encryption
- App runtime security

#### Account key generation and storage

A user account in Space is really just a [Private Key](https://en.wikipedia.org/wiki/Public-key_cryptography). Specifically, we currently use the [Ed25519 encryption algorithm](https://en.wikipedia.org/wiki/Public-key_cryptography) for our user keys. We generate them using [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) in order to also generate a mnemonic code that maps to this key in order to recover it later on.

To store this key, we use OS-level keychains whenever they are available. That way keys inherit the same level of access control:

- In MacOS we use the default Keychain app
- In Linux/Ubuntu we use [pass](https://www.passwordstore.org/)
- In Windows we use the Windows Credential Store

#### Key backups

Applications using the Space Daemon can choose to use our backup services by calling the [BackupKeysByPassphrase](../getting-started/#Backup-keys-by-passphrase) and [RecoverKeysByPassphrase](../getting-started/#Recover-keys-by-passphrase) methods. Key backups are extremely important if you want to allow users to sign in on multiple devices or to be able to clear their local storage and be able to still see their files later on.

To enable this service, Space Daemon connects to a cloud API called Space Services ([you can read the code by clicking here](https://github.com/FleekHQ/space-services/)). Specifically, we use the vault service in Space Services. A vault is used to securely store user private keys based on a master password. It is hosted on the cloud and uses the cryptography described in the following section to assure no one without the password can access the data directly, and that no one can brute-force the passwords either. It works very similarly to password managers.

##### Storing private keys

The client needs to complete a challenge to prove they have access to a given public key. Once they have proven access, the server allows replacing the vault file for a new one.

Private key signing challenge flow:

1. Client sends to the server their public key
2. Server issues a challenge
3. Client signs the challenge using its private key
4. Server verifies signature matches the public key, returning a JSON Web Token (JWT)

Storing the private key:

1. Client creates the vault file (`vf`), which is a JSON document that maps public keys to their private keys, but can also contain anything we want to store.
2. Client computes its vault key (`vk`). To do this, it runs `PBKDF2(password, salt, iterations, hashingFn)`, where `password` is the master password, `salt` is the user's `uuid`, `iterations` is a high number to prevent brute force (set to 100.000 as of now), and `hashingFn` is SHA512 which is the industry standard for a secure hashing function.
3. Using `vk`, client encrypts `vf` using AES, obtaining `vk(vf)`.
4. Client computes the vault service key (`vsk`) by doing key derivation again: `PBKDF2(vk, password, iterations, hashingFn)`, where `password` is the master password.
5. Client submits `vk(vf)`, `vsk` and the JWT back to the server.
6. Server verifies the JWT and successfully stores `vk(vf)` for the user with the given uuid.
7. Server stores `vskHash = PBKDF2(vsk, iterations, hashingFn)` using a really high value for `iterations`.

##### Retrieving the private key

1. Client computes `vk` and `vsk` again as in step (2) and (4) of the previous section.
2. Client sends a retrieve request to the server with `vsk` and `uuid` as the params.
3. Server computes `vskHash` as in (7) of the previous section.
4. Server checks `vskHash` matches the one stored. If it does, it returns `vk(vf)`. If not, returns a "Wrong password" error.
5. Client decrypts `vk(vf)` using `vk`, obtaining `vf` back and getting access to its private keys.

##### Takeaways

- The client only needs to remember the master password and the uuid (which is obtained through a username, so it needs to remember the username).
- The server only receives `vsk` and therefore cannot decrypt `vk(vf)` from it alone. It can bruteforce `vsk` to obtain `vk`, but given `vk` is a SHA512 hash already, it'd take a billion years.
- If a middleman intercepts the client->server message, and somehow gets to decrypt the first layer of protection which is TLS, it can't decrypt `vk(vf)` without `vk`.
- The server should implement rate-limitting to protect weak master passwords from being cracked.

#### File sharing encryption

Most of the privacy and encryption problems of file sharing are already taken care of by Textile. We use Textile's [Private Buckets](https://docs.textile.io/buckets/#encryption). You can get a deep dive on Private Buckets on Textile docs [by following this link](https://docs.textile.io/buckets/#encryption), but in summary, all files are encrypted on the way in and decrypted on the way out using [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard). Bucket metadata is stored on [Textile Threads](https://docs.textile.io/threads/) which handle encryption-based access control by default.

On top of this, in order to double ensure our file backup servers are not reading your data, the Space Daemon encrypts each file using AES too, and sends the encrypted file to Textile APIs. Space Daemon stores the encryption key of each file in a Textile thread which only lives on the local computer (the rest of the threads live remotely in order to enable file sharing). This key-storing thread is replicated on the cloud in case we need to restore it on a new device, but the `Thread Key` never leaves your local computer. Thread contents are indecipherable without it.

#### App runtime security

So far, we are making sure that keys are safely stored locally, safely backed up with near zero probabilistic chance of getting brute-forced (in case our databases got leaked), and files are being shared back and forth with strong cryptographic guarantees. However, the Space Daemon has open ports and another app running on the local machine could call its gRPC endpoints to execute unasked operations. To prevent this, the Space Daemon uses app tokens to gateway access to its gRPC interface. The first time the Space Daemon is initialized, it will allow calling the [InitializeMasterAppToken](../getting-started/#Initialize-master-app-token) method. This will generate a token which needs to be sent on each subsequent call to the Daemon. If the Daemon detects this token, it will allow access to any of its endpoints.

If the Space Daemon is already initialized, you can call the `GenerateAppToken` method, which receives an array of allowed methods that this token is going to have scoped access to. In an upcoming release of our Space App, we will be offering a marketplace of Space compatible third-party apps. The user will be able to selectively authorize the generation of app tokens ("Do you want to allow 'App X' to read your files?") so that these third-party apps can for example access the files of a user and offer new services on top of them.
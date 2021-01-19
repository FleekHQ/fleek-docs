If you want to reset your environment or simply start with a new fresh account, you can follow this guide that explain how to remove space temp files/passwords to start a new env.
Please have in mind that this process is going to remove all your space account info from your system (account, password, temp files, etc) so make sure to backup your files or account before continue with this process.

### Windows OS

First step is to remove the credentials from the **Windows Credential Manager**, to do that:

1. Click **Start > Control Panel > User Accounts > Credential Manager**
   
2. Select the Windows Credentials option. Locate the set of credentials that you want to remove (space credentials) and then expand the corresponding folder.

    ![Space Credentials Win](https://gpuente101-team-bucket.storage.fleek.co/space credentials win.png)
    ![Windows Credential Manager](https://answers.uillinois.edu/images/group180/68546/win1(2).png)

3. Then click Remove from Vault or Remove (depending upon which version of Windows you are running).
    ![Remove Credential](https://answers.uillinois.edu/images/group180/68546/win2(1).png)

Finally, you have to delete space temp files:

- `C:\Users\{User}\.buckd`
- `C:\Users\{User}\.fleek-space`
- `C:\Users\{User}\.ipfs`
- `C:\Users\{User}\AppData\Roaming\space-app\config.json`

**(replace `{User}` by your windows user folder)**




### OSX (Mac)

On OSX systems first step is to remove space passwords from keychain access:

1. Open the Mac Keychain. Click **Finder > Go > Utilities > Keychain Access**
    ![Open Keychain](https://gpuente101-team-bucket.storage.fleek.co/keychain 1.png)

2. On the search bar, type "space" (you will find 3 results):
    ![Find space credentials](https://gpuente101-team-bucket.storage.fleek.co/keychain 2.png)

3. Select the 3 space credentials, right click and select "delete items" option. Confirm the operation:
    ![Delete credentials](https://gpuente101-team-bucket.storage.fleek.co/keychain 3.png)

Last step is to remove the following space files from your system:

- `~/Library/Application\ Support/space-app/config.json`
- `~/.fleek-space`
- `~/.fleek-ipfs`
- `~/.buckd`
- `~/.ipfs`


### Linux (Ubuntu)

Remove space passwords from **Passwords and keys** application:

1. Click on **Applications/Passwords and keys**
    ![Passwords and keys](https://gpuente101-team-bucket.storage.fleek.co/keys 1.png)

2. Right click on **space** section on the sidebar and select **Delete** option
    ![Delete space passwords](https://gpuente101-team-bucket.storage.fleek.co/keys 2.png)

Finally delete the following space files:

- `~/.fleek-space`
- `~/.buckd`
- `~/.ipfs`
- `~/.config/space-app/config.json`
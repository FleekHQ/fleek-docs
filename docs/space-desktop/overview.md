---
date: "1"

---
The [Space Desktop App](https://github.com/FleekHQ/space-desktop){target=_blank} is available in the three most common operating systems: `macOS`, `Windows`, and `Linux`.

You can download the right installer for you from our [Github repository latest release page](https://github.com/FleekHQ/space-desktop/releases/latest){target=_blank}.

### macOS

Download the `.dmg` image and drag the Space Desktop app to your Applications folder as you usually do with others `.dmg` apps.

### Windows

Download the `.exe` executable file and just install the Space Desktop app as you usually do with others Windows apps. 

### Linux

For Linux, we generated an `AppImage` app. To run the `AppImage`, first you will need to make it executable:

```bash
  chmod a+x space-app-{LATEST_VERSION}-linux-x86_64.AppImage
```

And then, just run it!

```bash
  ./space-app-{LATEST_VERSION}-linux-x86_64.AppImage
```

!!! important

    We highly recommend to install the `AppImage` with [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher/releases/latest), it will give you a better experience and also is recommended by the [electron builder library](https://www.electron.build/configuration/appimage){target=_blank} that we use to build the Space Desktop app.

!!! info

    You don't know what it is an `AppImage` app? You can visit the [AppImage website](https://appimage.org/){target=_blank} to get more information.
# Sidekick
Sidekick as a standalone desktop application

### Prepare media library assets

In the `scratch-desktop` directory, run `npm run fetch`. Re-run this any time you update `scratch-gui` or make any
other changes which might affect the media libraries.

### Run in development mode

`npm start`

### Make a packaged build

`npm run dist`

Node that on macOS this will require installing various certificates.

#### Signing the NSIS installer (Windows, non-store)

### Make a semi-packaged build

This will simulate a packaged build without actually packaging it: instead the files will be copied to a subdirectory
of `dist`.

`npm run dist:dir`

### Debugging

You can debug the renderer process by opening the Chromium development console. This should be the same keyboard
shortcut as Chrome on your platform. This won't work on a packaged build.

You can debug the main process the same way as any Node.js process. I like to use Visual Studio Code with a
configuration like this:

```jsonc
    "launch": {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Desktop",
                "type": "node",
                "request": "launch",
                "cwd": "${workspaceFolder:sidekick-desktop}",
                "runtimeExecutable": "npm",
                "autoAttachChildProcesses": true,
                "runtimeArgs": ["start", "--"],
                "protocol": "inspector",
                "skipFiles": [
                    // it seems like skipFiles only reliably works with 1 entry :(
                    //"<node_internals>/**",
                    "${workspaceFolder:sidekick-desktop}/node_modules/electron/dist/resources/*.asar/**"
                ],
                "sourceMaps": true,
                "timeout": 30000,
                "outputCapture": "std"
            }
        ]
    },
```

### Resetting the Telemetry System

This application includes a telemetry system which is only active if the user opts in. When testing this system, it's
sometimes helpful to reset it by deleting the `telemetry.json` file.

The location of this file depends on your operating system and whether or not you're running a packaged build. Running
from `npm start` or equivalent is a non-packaged build.

In addition, macOS may store the file in one of two places depending on the OS version and a few other variables. If
in doubt, I recommend removing both.

- Windows, packaged build: `%APPDATA%\Sidekick\telemetry.json`
- Windows, non-packaged: `%APPDATA%\Electron\telemetry.json`
- macOS, packaged build: `~/Library/Application Support/Sidekick/telemetry.json` or
  `~/Library/Containers/sidekickteam.sidekick.sidekick-desktop/Data/Library/Application Support/Sidekick/telemetry.json`
- macOS, non-packaged build: `~/Library/Application Support/Electron/telemetry.json` or
  `~/Library/Containers/sidekickteam.sidekick.sidekick-desktop/Data/Library/Application Support/Electron/telemetry.json`

Deleting this file will:

- Remove any pending telemetry packets
- Reset the opt in/out state: the app should display the opt in/out modal on next launch
- Remove the random client UUID: the app will generate a new one on next launch

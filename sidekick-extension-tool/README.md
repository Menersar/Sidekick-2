# sidekick-extension-tool
Tool for creating and building sidekick extension.

## Instructions
### Required files and folder (holding files) for building extensions 
- The following extension's folders and associated files are located in <a href="https://github.com/Menersar/sidekick-extension-tool/tree/main/extensions/example-extension"> /extensions/[EXTENSION-NAME]<a/>. <br/>
(Note: Instead of `[EXTENSION-NAME]` the (folder) name of an extension is given.) <br/>
(IMPORTANT: The extension (and correlating folder) name must NOT contain spaces for the build command to function properly!) 

#### Folders
- <a href="https://github.com/Menersar/sidekick-extension-tool/tree/main/extensions/example-extension/locales">/locales<a/>: Files the implemented block language files.
- <a href="https://github.com/Menersar/sidekick-extension-tool/tree/main/extensions/example-extension/assets">/assets<a/>: Files an extension's resources (e. g. icons or background images).

#### Files
- <a href="https://github.com/Menersar/sidekick-extension-tool/tree/main/extensions/example-extension/info.json">info.json<a/>: Holds basic information about an extension.
- <a href="https://github.com/Menersar/sidekick-extension-tool/tree/main/extensions/example-extension/index.js">index.js<a/>: Names an extension's blocks and implements their functionalities.

---

### Commands
- Install project dependencies. 
  ```console
  yarn install
  ```
- Build all extension
  ```console
  yarn run build:all
  ```
  (Output 1: Build files in <a href="https://github.com/Menersar/sidekick-extension-tool/tree/main/extensions/example-extension/build">/build<a/>). <br/>
  (Output 2: `.skx` file in <a href="https://github.com/Menersar/sidekick-extension-tool/tree/main/extensions/example-extension/dist">/dist<a/>).

- Build the extension `[EXTENSION-NAME]`, 
  ```console
  yarn run build:extension [EXTENSION-NAME-1] [EXTENSION-NAME-2] … [EXTENSION-NAME-X]
  ``` 
  (Note: Instead of `[EXTENSION-NAME]` provide the folder name(s) of the extension(s) you want to build.) <br/>
  (IMPORTANT: `[EXTENSION-NAME]` (and correlating folder name) must NOT contain spaces for the build command to function properly!) <br/>
  (Output 1: Build files in <a href="https://github.com/Menersar/sidekick-extension-tool/tree/main/extensions/example-extension/build">/build<a/>). <br/>
  (Output 2: `.skx` file in <a href="https://github.com/Menersar/sidekick-extension-tool/tree/main/extensions/example-extension/dist">/dist<a/>).

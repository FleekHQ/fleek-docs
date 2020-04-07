---
name: Build Configurations
---

# JavaScript Single Page Applications (SPA's)
Javascript SPA’s generally have a build script defined in the `package.json` file. Simply set the build command to `npm install && npm run [BUILD_SCRIPT]` or `yarn && yarn [BUILD_SCRIPT]` depending on your preferred dependency manager.

You will also have to define correct `publicDir`, here's list of default configurations for popular frameworks:

<div id="framework-list">

| Framework          | Docker Image           | Build Command                       | Public Directory |
|--------------------|------------------------|-------------------------------------|------------------|
| Create React App   | fleek/create-react-app | `yarn && yarn build`                | build            |
| Gatsby             | fleek/gatsby           | `yarn && gatsby build`              | public           |
| Hugo               | fleek/hugo             | `yarn && hugo`                      | public           |
| Jekyll             | fleek/jekyll           | `jekyll build`                      | _site            |
| Next JS            | fleek/next-js          | `yarn && yarn build && yarn export` | out              |

</div>

### Using a Docker Image with an Older Node Version

By the default, the Fleek Docker images use the latest Node.js version available when applicable. It is possible to use an older Node version by applying the correct Docker tag.

EG: To use Gatsby with Node 10, the Docker image is `fleek/gatsby:node-10`

# File configuration

Using a .fleek.json configuration file, placed at the root of a project, you can provide options that changes the default build behavior and overrides settings from UI (except secrets).

```json
{
 "build": {
   "image": "node:alpine",
   "command": "npm install && npm run build && echo $SOME_ENV",
   "publicDir": "build",
   "baseDir": "frontend",
   "environment": {
     "SOME_ENV": "Build finished!"
   }
 }
}
```

#### All these fields are optional:

- `image` public docker image, default to node:slim
- `command` no command is executed by default
- `baseDir` build command is executed in this directory, root directory is used by default
- `publicDir` this directory is uploaded to IPFS, `baseDir` is used by default
- `environment` key/value object of environment variables

If you use `baseDir = /frontend` and `publicDir = /dist`, published path is `/frontend/dist`. If you need to publish directory above or next to your `baseDir`, you can use relative path `publicDir = ../../dist`.

# Testing builds locally

We're using docker containers to execute your builds, so you can test them locally with Docker. Here's a sample docker-compose.yml, we're using Verdaccio as a local npm proxy (it's not supported for production builds).

```yaml
version: '3.7'
services:
  verdaccio:
    container_name: verdaccio
    image: verdaccio/verdaccio
    ports:
      - "4873:4873"

  app:
    image: $IMAGE
    command: sh -c 'npm set registry http://verdaccio:4873 && $BUILD_COMMAND'
    working_dir: /workspace/$BASE_DIR
    environment: $ENVIRONMENT
    volumes:
      - './path/to/app:/workspace/$BASE_DIR'
```

#### Building Gatsby locally

You can execute configuration below with command `docker-compose run -it --rm app`.

```yaml
version: '3.7'
services:
  verdaccio:
    container_name: verdaccio
    image: verdaccio/verdaccio
    ports:
      - "4873:4873"

  app:
    image: fleek/gatsby
    command: sh -c 'npm set registry http://verdaccio:4873 && npm install && npm run build'
    working_dir: /workspace
    volumes:
      - './path/to/app:/workspace'
```


# We are here to help

We are happy to help get your website up and running. Please feel free to reach out on our [website](https://fleek.co), in our [Community Chat](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A), on [Twitter](https://twitter.com/FleekHQ), or at support@fleek.co

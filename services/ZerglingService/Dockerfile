# Latest LTS version of Node on Docker Hub is "argon"
FROM node:argon

WORKDIR /app

ONBUILD ARG APP_VERSION
ONBUILD ENV APP_VERSION ${APP_VERSION}

# Install app dependencies

# NOTE: By copying the package.json into the /tmp folder we can take advantage
# of the caching mechanism provided by Docker. Only if our package.json
# has been modified then Docker will re-run the npm install command.
# Otherwise it will use the node_modules folder from its internal cache.

COPY package.json .npmrc /tmp/
 RUN cd /tmp && npm install --prod
 RUN cp -a /tmp/node_modules /app

# Cleanup NPM cache to reduce image size
 RUN npm cache clear

# Copy app source after installing the NPM modules to not force a recaching
# of the NPM modules
 COPY . /app

ENV NODE_ENV=docker

CMD ["node", "app.js"]
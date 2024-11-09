FROM node:23.1.0-slim AS dev

# Change these UID and GID to your own (so that you wont run into permission problems inside the container) (the way that I've handled this is proportional to my workstation, this should change in the future as we move into the cloud and/or multiple devs wanna work on the UI)
ARG UID=1000
ARG GID=1000

RUN groupmod -g ${GID} node && usermod -u ${UID} -g ${GID} node

# RUN mkdir /node_modules && chown -R ${UID}:${GID} /node_modules ;

# RUN apt update -y && apt install netcat -y

# USER node
# WORKDIR /app

# ENV PATH="${PATH}:/node_modules/.bin"

# EXPOSE 3000

# CMD ["bash", "-c", "yarn && yarn dev"]

CMD ["bash", "-c", "sleep infinity"]

HEALTHCHECK --interval=10s --timeout=10s CMD nc -w 1 -z -v 0.0.0.0 3000 || exit 1

#
#
#
#
#

FROM dev AS dev-build
# USER root
# RUN chown node:node /app ;
# ADD --chown=node:node source /app
# USER node
# RUN yarn
# RUN yarn build
# RUN ls -lah

FROM dev-build AS staging
CMD ["bash", "-c", "yarn start"]

#
#
#
#
#

FROM staging as prod
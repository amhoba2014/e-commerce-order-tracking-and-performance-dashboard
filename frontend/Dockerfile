FROM node:23.1.0-slim AS dev

USER root
RUN apt update -y && apt install netcat-openbsd -y

USER root
RUN mkdir /assets && chown node:node /assets

USER node
COPY --chown=node:node ./assets/package.json ./assets/yarn.lock /assets/
WORKDIR /assets
RUN echo 'alias yarn="yarn --modules-folder $HOME/node_modules"' >> ~/.bashrc
RUN bash -li -c "yarn"


# USER node
# WORKDIR /app

# ENV PATH="${PATH}:/node_modules/.bin"


# CMD ["bash", "-c", "yarn && yarn dev"]



USER node
EXPOSE 3000
CMD ["bash", "-li", "-c", "yarn dev ; sleep infinity"]

HEALTHCHECK --interval=1s --timeout=3s CMD nc -w 1 -z -v 0.0.0.0 3000 || exit 1

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
# [todo] copy from dev-build. change 'FROM dev-build' to 'FROM dev'
CMD ["bash", "-c", "yarn start"]

#
#
#
#
#

FROM staging as prod
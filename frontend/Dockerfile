FROM node:23.1.0-slim AS dev

USER root
RUN apt update -y && apt install netcat-openbsd -y

USER root
RUN mkdir /assets && chown node:node /assets

USER root
RUN npm install -g pnpm

USER node
COPY --chown=node:node ./assets/package.json ./assets/pnpm-lock.yaml /assets/
WORKDIR /assets
RUN bash -li -c "pnpm install"


# USER node
# WORKDIR /app

# ENV PATH="${PATH}:/node_modules/.bin"


# CMD ["bash", "-c", "yarn && yarn dev"]



USER node
EXPOSE 3000
CMD ["bash", "-li", "-c", "pnpm run dev ; sleep infinity"]

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

FROM dev AS staging
# [todo] copy from dev-build.
CMD ["bash", "-c", "yarn start"]

#
#
#
#
#

FROM staging as prod
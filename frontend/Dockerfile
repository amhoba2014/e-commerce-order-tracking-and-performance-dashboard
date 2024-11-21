FROM node:23.1.0-slim AS dev

USER root
RUN apt update -y && apt install netcat-openbsd -y

USER root
RUN mkdir /assets && chown node:node /assets

USER root
RUN npm install -g pnpm

USER node
RUN echo 'alias l="ls -lh"\nalias ll="ls -alF"' >> ~/.bashrc

USER node
COPY --chown=node:node ./assets/package.json ./assets/pnpm-lock.yaml /home/node/
RUN bash -li -c "cd /home/node ; pnpm i ; mkdir .pnpm-store ;"


# USER node
# WORKDIR /app

# ENV PATH="${PATH}:/node_modules/.bin"


# CMD ["bash", "-c", "yarn && yarn dev"]



USER node
EXPOSE 3000
WORKDIR /assets
CMD ["bash", "-li", "-c", "ln -s ~/.pnpm-store .pnpm-store ; ln -s ~/node_modules node_modules ; pnpm run dev ; sleep infinity ; rm .pnpm-store ; rm node_modules ; "]

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
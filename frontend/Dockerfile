FROM node:23.1.0-slim AS dev

USER root
RUN apt update -y && apt install netcat-openbsd -y

USER root
RUN mkdir /assets && chown node:node /assets

USER root
RUN npm install -g pnpm

USER root
RUN apt install curl iputils-ping -y

USER node
RUN echo 'alias l="ls -lh"\nalias ll="ls -alF"' >> ~/.bashrc

USER node
EXPOSE 3000
WORKDIR /assets
CMD ["bash", "-li", "entrypoint.sh"]

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

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
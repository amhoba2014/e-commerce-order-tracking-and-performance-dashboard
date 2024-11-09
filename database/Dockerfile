FROM postgres:17.0-alpine3.20 as dev
EXPOSE 5432
HEALTHCHECK --interval=1s --timeout=3s CMD nc -w 1 -z -v 0.0.0.0 5432 || exit 1

#
#
#
#
#

FROM dev as staging

#
#
#
#
#

FROM staging as prod
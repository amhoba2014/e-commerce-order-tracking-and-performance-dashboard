FROM postgres:17.0-alpine3.20 as dev
EXPOSE 5432
HEALTHCHECK --interval=10s --start-period=5s CMD pg_isready -U postgres || exit 1

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
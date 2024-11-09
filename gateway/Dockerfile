FROM traefik:v3.2.0 as dev
EXPOSE 80 443 8080
HEALTHCHECK --interval=1s --timeout=3s CMD nc -w 1 -z -v 0.0.0.0 80 || exit 1

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
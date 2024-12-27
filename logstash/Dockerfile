ARG ELASTIC_VERSION

# https://www.docker.elastic.co/
FROM docker.elastic.co/logstash/logstash:${ELASTIC_VERSION:-8.17.0} as dev

# Add your logstash plugins setup here
# Example: RUN logstash-plugin install logstash-filter-json

# Healthcheck for Logstash
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s \
  CMD curl -f http://localhost:9600 || exit 1

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
ARG ELASTIC_VERSION

# https://www.docker.elastic.co/
FROM docker.elastic.co/kibana/kibana:${ELASTIC_VERSION:-8.17.0} as dev

# Add your kibana plugins setup here
# Example: RUN kibana-plugin install <name|url>

# Healthcheck for Kibana
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD curl -f http://localhost:5601/api/status || exit 1

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
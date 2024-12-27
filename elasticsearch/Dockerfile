ARG ELASTIC_VERSION

# https://www.docker.elastic.co/
FROM docker.elastic.co/elasticsearch/elasticsearch:${ELASTIC_VERSION:-8.17.0} as dev

# Add your elasticsearch plugins setup here
# Example: RUN elasticsearch-plugin install analysis-icu

# Healthcheck for Elasticsearch
HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=30s \
  CMD /bin/sh -c 'curl -s http://localhost:9200/_cluster/health/n || \
    if [ $? -eq 22 ]; then echo "401 Unauthorized"; exit 0; \
    else echo "Unexpected error"; exit 1; fi'

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
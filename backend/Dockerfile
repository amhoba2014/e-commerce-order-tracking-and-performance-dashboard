FROM python:3.14-rc-slim AS dev

# Add a non-root user
RUN useradd -ms /bin/bash python

# # Install dependencies for compiling psycopg2
# RUN apt update -y && apt install -y libpq-dev
# RUN apt install -y build-essential gcc

# # Install python dependencies
# ADD ./requirements.txt /requirements.txt
# RUN pip install -r /requirements.txt

RUN apt update -y && apt install netcat-openbsd -y

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

USER python
WORKDIR /app
EXPOSE 8000

CMD ["bash", "-c", "sleep infinity"]

HEALTHCHECK --interval=1s --timeout=3s CMD nc -w 1 -z -v 0.0.0.0 8000 || exit 1

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
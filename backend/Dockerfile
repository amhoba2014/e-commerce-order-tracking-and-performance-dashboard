FROM python:3.14-rc-slim AS dev

USER root
RUN useradd -ms /bin/bash python

USER root
RUN apt update -y && apt install netcat-openbsd -y
RUN apt update -y && apt install pipx -y

USER python
RUN pipx ensurepath
RUN pipx install poetry

# # Install dependencies for compiling psycopg2
# USER root
# RUN apt update -y && apt install -y libpq-dev
# RUN apt install -y build-essential gcc

# # Install python dependencies
# ADD ./requirements.txt /requirements.txt
# RUN pip install -r /requirements.txt

USER python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /assets
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
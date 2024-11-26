FROM python:3.14-rc-slim AS dev

USER root
RUN useradd -ms /bin/bash python

USER root
RUN apt update -y && apt install netcat-openbsd -y
RUN apt update -y && apt install pipx -y

USER python
RUN pipx ensurepath
RUN pipx install poetry

USER root
RUN apt-get install iputils-ping -y

USER root
RUN mkdir /assets && chown python:python /assets

USER python
RUN bash -li -c "poetry config virtualenvs.in-project true"
RUN echo 'alias l="ls -lh"\nalias ll="ls -alF"' >> ~/.bashrc

USER python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /assets
EXPOSE 8000
CMD ["bash", "-li", "entrypoint.sh"]

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
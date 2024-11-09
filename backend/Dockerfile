FROM python:3.14-rc-slim AS dev

# Add a non-root user
RUN useradd -ms /bin/bash python

# # Install dependencies for compiling psycopg2
# RUN apt update -y && apt install -y libpq-dev
# RUN apt install -y build-essential gcc

# # Install python dependencies
# ADD ./requirements.txt /requirements.txt
# RUN pip install -r /requirements.txt

# RUN apt update -y && apt install netcat -y

# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

# RUN mkdir /avatars
# RUN chown -R python:python /avatars

# # Setting non-root user as the default, setting the workdir and then its done
# USER python
# WORKDIR /app
# ENV PYTHONPATH=/app/dashboard
# ENV TZ=UTC
# EXPOSE 8000

# CMD ["bash", "launch.sh"]

# HEALTHCHECK --interval=10s --timeout=10s CMD nc -w 1 -z -v 0.0.0.0 8000 || exit 1

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
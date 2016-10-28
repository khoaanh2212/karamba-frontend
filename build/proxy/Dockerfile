FROM nginx:1.9.5
ARG SOURCES_MIRROR=""
RUN if [ ! -z "${SOURCES_MIRROR}" ]; then echo "$SOURCES_MIRROR" > /etc/apt/sources.list ; fi
RUN apt-get update -y -q \
  && apt-get install -y vim ngrep telnet wget

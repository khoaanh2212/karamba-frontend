FROM nginx:1.9.5
ARG SOURCES_MIRROR=""
RUN if [ ! -z "${SOURCES_MIRROR}" ]; then echo "$SOURCES_MIRROR" > /etc/apt/sources.list ; fi
RUN apt-get update -y -q \
  && apt-get install -y vim ngrep
RUN apt-get update && apt-get install build-essential wget python -y && apt-get clean all
RUN wget https://nodejs.org/dist/v4.4.6/node-v4.4.6.tar.gz && \
	tar -xvf node-v4.4.6.tar.gz && \
	cd node-v4.4.6 && \
	ls -la && \
	./configure && \
	make && \
	make install && \
	cd .. && \
	rm node-v4.4.6.tar.gz && \
	rm -fr node-v4.4.6
RUN apt-get update && apt-get install libfontconfig1 -y && apt-get clean
WORKDIR /var/compile
ARG PHANTOMJS_CDNURL=""
ARG SASS_BINARY_SITE=""
ARG NPM_CONFIG_REGISTRY=""
RUN mkdir -p /var/compile
COPY package.json npm-shrinkwrap.json /var/compile/
RUN npm install
COPY src /var/compile/src/
COPY test /var/compile/test/
COPY webpack /var/compile/webpack/
COPY *.sh .babelrc /var/compile/
ARG APP_NAME=appName
ARG PUBLIC_PATH="/"
RUN bash runTests.sh $APP_NAME
RUN bash build-app.sh $APP_NAME
ADD ./conf.d/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080

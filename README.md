

Frontend
========
* NPM Version 4.4.6 (4.4.7 is also fine)
* `npm install`
* `npm run admin:dev` run admin bundle server on [http://localhost:8080](http://localhost:8080)
* `npm run admin:test` run test from admin bundle
* `npm run carnovo:dev` run carnovo bundle server on [http://localhost:8080](http://localhost:8080)
* `npm run carnovo:test` run test from carnovo bundle

SimpleGrid info: https://github.com/ThisIsDallas/Simple-Grid

For development/test it's mandatory to run the mock server which handle all the requests from services
* `(node|nodemon) test/resources/server`
* `mockServer:run` run mock server (to develop/test)

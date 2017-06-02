A platform that lets protégés sign up to find their mentors, using a string query.

Powered by Elasticsearch, postgres, node, express, react & redux.

Install the dependencies and start the server.

Create .env file for the project & senpie_server using

example - set up by your local environment

```

DB_HOST=localhost
DB_USER=example
DB_PASS=example
DB_NAME=example
DB_PORT=5432

```

```
npm install
npm start
open http://localhost:4000

```
To start the server

```
cd senpie_server
npm install
node app.js

```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:4000/build/my_image.png`.

### Linting

```
npm run lint

```

### Dependencies

* Elasticsearch
* React
* Webpack
* PostgreSQL
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

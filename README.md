# Accessment in Nodejs, React, SQL


## Introduction
Accessment in Nodejs, React, SQL

## Table of Contents

* [Link to local API backend](#Link-to-local-api-backend)
* [API Documentation on local](#API-documentation-on-local)
* [Link to notification websocket](#Link-to-notification-websocket)
* [Technologies Used](#technologies-used)
* [Testing Tools](#testing-tools)
* [Application Features](#application-features)
* [API Documentation on local](#api-documentation-on-local)
* [How to Run](#how-to-run)
* [How to Test](#how-to-test)
* [Author](#author)
* [License](#license) 


## Link to local API backend

* [API link](http://localhost:8080/api/v1)

## API Documentation on local

* [API doc](http://localhost:8080/api/v1/docs)


## Technologies Used

* [React.js]
* [Node.js](https://nodejs.org/en/)
* [Es6](https://es6.io/)
* [typescript]
* [Express](https://expressjs.com)
* [JWT](https://www.npmjs.com/package/jsonwebtoken)
* [Eslint](https://eslint.org) (Airbnb--style guide)
* [mysql]
* [docker]
* [microservices]


## Testing Tools

* [Mocha](https://mochajs.org) - A javascript test framework
* [Chai](https://www.chaijs.com) - Assertion library
* [Jest](https://jestjs.io/docs/getting-started) - A javascript test framework


## Application Features

* Users login
* Users can signup
* Users can view a list asteroids without being logged in
* Users can veiw a single asteroid in detail
* Users can sort asteroids by name and date
* Users can add asteroid to favorites
* Users can view favorite asteroids


## How to Run

```
# Clone this repository
$ git clone https://github.com/mecsoccer/fullstack-sql.git

# Go into the repository
$ cd ./fullstack-sql/ts

# Run the app (docker installation required)
$ docker compose up --build -d

app should now be running at http://localhost:8080/api/v1.
find api docs: http://localhost:8080/api/v1/docs

sample login credentials
user1: marques@gmail.com df1a&s*SDdfs9da
user2: pedro.santos@gmail.com df1a&s*SDdfs9da
```

## How to Test

```
# Clone this repository
$ git clone https://github.com/mecsoccer/fullstack-sql.git

# Go into the repository
$ cd ./fullstack-sql/ts/api

# Install dependencies
$ npm install

# run test
$ npm run test
```


## Author
Jaachimma Onyenze


## License
MIT

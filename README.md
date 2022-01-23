# CVTasks

A basic task / homework management Rails + React app, using a JSON RESTful API... for the most part.

*(The reason it drifted away from full RESTful is that I need to ues OmniAuth for OAuth, which can't operate in a REST setting for reasons that should be obvious.)*

## Installing

You need:

* Ruby 2.7.0, which comes with Ubuntu 20.04 LTS
* A reasonably modern version of NodeJS
* postgresql

Steps to install:

1. Install Ruby dependencies: `bundle install`.
2. Install Node dependencies: `npm install react react-dom react-materialize materialize-css@next react-router-dom@6`
3. Set up a PostgreSQL role. The username must be "cvtasks".
4. Copy config/application.yml.example to config/application.yml and replace the placeholders with your own correct values
5. Run database migrations: `rake db:create && rake db:migrate`
6. Start and enjoy

## Running

For the full Rails development environment, use `rails s`.

For a production server, use `RAILS_SERVE_STATIC_FILES=t rails s -e production`.

**Bleeding-edge Node users:** `export NODE_OPTIONS=--openssl-legacy-provider` so that Webpacker will work properly!

-----

© 2022 Poomklao Teerawatthanaprapha (A0245219E)

# MASKY API

> OpenAPI Flask app that serves data to masky model for predictions.

## Features

Its not just Flask but an ecosystem to properly create a RESTful API service:

- [Connexion](https://connexion.readthedocs.io/en/latest/index.html) is a framework on top of Flask that automagically handles HTTP requests defined using OpenAPI (formerly known as Swagger), supporting both v2.0 and v3.0 of the specification.
- [Flask](https://flask.palletsprojects.com/en/1.1.x/) is a lightweight WSGI web application framework in Python. It is designed to make getting started very quickly and very easily.
- [marshmallow](https://marshmallow.readthedocs.io/en/stable/) is an ORM/ODM/framework-agnostic library for converting complex datatypes, such as objects, to and from native Python datatypes.
- [Flask-Marshmallow](https://flask-marshmallow.readthedocs.io/en/latest/) is a thin integration layer for Flask and marshmallow that adds additional features to marshmallow.
- [SQLAlchemy](https://www.sqlalchemy.org/library.html) is the Python SQL toolkit and Object Relational Mapper that gives application developers the full power and flexibility of SQL.
- [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/) is an extension for Flask that adds support for SQLAlchemy to your application. It aims to simplify using SQLAlchemy with Flask.
- [Alembic](http://alembic.zzzcomputing.com/)
- [flask_migrate](https://flask-migrate.readthedocs.io/en/latest/).
- [Flask-Script](https://flask-script.readthedocs.io/)

### Code characteristics

- Tested on Python 2.6, 2.7, 3.3, 3.4, 3.5 and 3.6
- Well organized directories with lots of comments
  - app
    - api
    - celery
    - commands
    - models
  - tests
- Includes test framework (`py.test`)
- Includes database migration framework (`alembic`)

## Installation

### 1. Get the code

    git clone
    cd mask-api

### 2. Install requirements

    pip install -r requirements.txt

### Initializing the Database

    # Create DB tables and populate the roles and users tables
    python manage.py init_db

### 3. Set the FLASK_APP environment variable

### 4. Run the application

#### Running the app (production)

To run the application in production mode, gunicorn3 is used (and included in requirements.txt.

    # Run the application in production mode
    ./runserver.sh

#### Running the automated tests

    # Start the Flask development web server
    py.test tests/

## Example

### Data Routes

.route('/') # index html file
etc
Application Errors https://flask.palletsprojects.com/en/1.1.x/errorhandling/

### Model Routes

.route('/api/predict/', methods=['POST']) # Takes in JSON, still figuring out.

## Data Powering the Web app

## Todo Checklist

A helpful checklist to gauge how your README is coming on what I would like to finish:

- [ ] Lots of items! :)
- [ ] Need to add Celery

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

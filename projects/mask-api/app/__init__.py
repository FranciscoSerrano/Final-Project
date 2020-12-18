# __init__.py is a special Python file that allows a directory to become
# a Python package so it can be accessed using the 'import' statement.

from datetime import datetime
import os
from celery import Celery
import connexion
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename

basedir = os.path.abspath(os.path.dirname(__file__))


# Instantiate Flask extensions
ma = Marshmallow()
db = SQLAlchemy()
migrate = Migrate()
pymongo = PyMongo()


# https://flask.palletsprojects.com/en/1.1.x/patterns/celery/
def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config["CELERY_RESULT_BACKEND"],
        broker=app.config["CELERY_BROKER_URL"],
    )
    celery.conf.update(app.config)

    # This is important, I'm running a celery.task to run the model prediction
    # in the background of the app and not hold up the response. But also updating
    # the frontend with statuses of the computation to show the user feedback.
    # https://www.distributedpython.com/2018/09/28/celery-task-states/
    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery


# https://flask.palletsprojects.com/en/0.12.x/patterns/appfactories/
def create_app(extra_config_settings={}):
    """Create a Flask application."""

    # Create the connexion application instance
    app = connexion.FlaskApp(__name__, specification_dir=basedir)

    # Read the openapi.yaml file to configure the endpoints
    app.add_api("openapi.yaml")

    application = app.app

    # Load App Config settings
    # Load common settings from 'app/settings.py' file
    application.config.from_object("app.settings")
    # Load local settings from 'app/local_settings.py'
    application.config.from_object("app.local_settings")
    # Load extra config settings from 'extra_config_settings' param
    application.config.update(extra_config_settings)

    # Setup Flask-Extensions -- do this _after_ app config has been loaded
    # We are doing this because our web application could have different
    # config files depending the server environment and context.

    # Setup Marshmallow
    ma.init_app(application)

    # Setup Flask-SQLAlchemy
    db.init_app(application)

    # Setup Flask-Migrate
    migrate.init_app(application, db)

    # Setup PyMongo
    pymongo.init_app(application)

    # Celery
    celery = make_celery(application)

    return application

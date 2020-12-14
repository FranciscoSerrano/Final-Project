# __init__.py is a special Python file that allows a directory to become
# a Python package so it can be accessed using the 'import' statement.

from datetime import datetime
import os

import connexion
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate, MigrateCommand

basedir = os.path.abspath(os.path.dirname(__file__))

# Instantiate Flask extensions
ma = Marshmallow()
db = SQLAlchemy()
migrate = Migrate()

# https://flask.palletsprojects.com/en/0.12.x/patterns/appfactories/
def create_app(extra_config_settings={}):
    """Create a Flask application.
    """
    # Create the connexion application instance
    app = connexion.FlaskApp(__name__, specification_dir=basedir)

    # Read the openapi.yaml file to configure the endpoints
    app.add_api("swagger.yaml")

    # Load App Config settings
    # Load common settings from 'app/settings.py' file
    app.config.from_object("app.settings")
    # Load local settings from 'app/local_settings.py'
    app.config.from_object("app.local_settings")
    # Load extra config settings from 'extra_config_settings' param
    app.config.update(extra_config_settings)

    # Setup Flask-Extensions -- do this _after_ app config has been loaded
    # We are doing this because our web application could have different
    # config files depending the server environment and context.

    # Setup Marshmallow
    ma.init_app(app)

    # Setup Flask-SQLAlchemy
    db.init_app(app)

    # Setup Flask-Migrate
    migrate.init_app(app, db)

    # Register blueprints
    from app.views.landing import main_blueprint
    from app.views.apis import api_blueprint

    app.register_blueprint(main_blueprint)
    app.register_blueprint(api_blueprint)

    # Register blueprints
    from app.views.landing import main_blueprint

    app.register_blueprint(main_blueprint)

    return app

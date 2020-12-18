# This file defines command line commands for manage.py

import datetime

from flask import current_app
from flask_script import Command

from app import db
from app.models.image_dbmodel import Image


class InitDbCommand(Command):
    """ Initialize the database."""

    def run(self):
        init_db()


def init_db():
    """ Initialize the database."""
    db.drop_all()
    db.create_all()
    create_images()


def create_images():
    """ Create images """

    # Create all tables
    db.create_all()

    # Save to DB
    db.session.commit()

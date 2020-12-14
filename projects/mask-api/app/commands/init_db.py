# This file defines command line commands for manage.py

import datetime

from flask import current_app
from flask_script import Command

from app import db
from app.models.maksy_models import Person


class InitDbCommand(Command):
    """ Initialize the database."""

    def run(self):
        init_db()


def init_db():
    """ Initialize the database."""
    db.drop_all()
    db.create_all()
    create_users()


def create_users():
    """ Create users """

    # Create all tables
    db.create_all()

    # Create People tables
    PEOPLE = [
        {"fname": "Doug", "lname": "Farrell"},
        {"fname": "Kent", "lname": "Brockman"},
        {"fname": "Bunny", "lname": "Easter"},
    ]

    # iterate over the PEOPLE structure and populate the database
    for person in PEOPLE:
        p = Person(lname=person.get("lname"), fname=person.get("fname"))
        db.session.add(p)

    # Save to DB
    db.session.commit()

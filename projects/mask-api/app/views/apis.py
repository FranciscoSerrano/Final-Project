from flask import Blueprint, redirect, render_template
from flask import (
    request,
    url_for,
    flash,
    send_from_directory,
    jsonify,
    render_template_string,
    make_response,
    abort,
)

# When using a Flask app factory we must use a blueprint to avoid needing 'app' for '@app.route'
api_blueprint = Blueprint("api", __name__, template_folder="templates")


@api_blueprint.route("/maskydata", methods=["GET"])
def maskydata():

    ret = {"sample return": 10}
    return (jsonify(ret), 200)

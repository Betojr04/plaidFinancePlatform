from flask import Blueprint, request, jsonify, Flask, send_from_directory, current_app
import os


main_bp = Blueprint("main", __name__)


@main_bp.route("/", methods=["GET"])
def index():
    templates_dir = os.path.join(current_app.root_path, "..", "templates")
    return send_from_directory(templates_dir, "index.html")


@main_bp.route("/<path:path>", methods=["GET"])
def catch_all(path):
    templates_dir = os.path.join(current_app.root_path, "..", "templates")
    return send_from_directory(templates_dir, "index.html")

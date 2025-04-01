from flask import Flask
from .config import Config
from .plaid_clients import init_plaid_client
from .routes import main_bp
from .plaid_routes import plaid_bp


def create_app():
    app = Flask(__name__, static_folder="../static")
    app.config.from_object(Config)

    init_plaid_client(app)

    app.register_blueprint(main_bp)
    app.register_blueprint(plaid_bp)

    return app

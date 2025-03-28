from flask import Flask
from .config import Config
from .plaid_clients import init_plaid_client
from .routes import main_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    init_plaid_client(app)

    app.register_blueprint(main_bp)

    return app

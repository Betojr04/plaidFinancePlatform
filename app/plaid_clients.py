from plaid.configuration import Configuration
from plaid.api_client import ApiClient
from plaid.api import plaid_api

# Global variable to store the Plaid client instance
plaid_client = None


def init_plaid_client(app):
    global plaid_client

    # Get the environment from your app configuration
    env = app.config.get("PLAID_ENV", "sandbox")

    # Manually map the environment string to the appropriate host URL
    host = {
        "sandbox": "https://sandbox.plaid.com",
        "development": "https://development.plaid.com",
        "production": "https://production.plaid.com",
    }.get(env, "https://sandbox.plaid.com")

    configuration = Configuration(
        host=host,
        api_key={
            "clientId": app.config["PLAID_CLIENT_ID"],
            "secret": app.config["PLAID_SECRET"],
        },
    )

    api_client = ApiClient(configuration)
    plaid_client = plaid_api.PlaidApi(api_client)

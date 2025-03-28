from flask import Blueprint, request, jsonify
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from app.plaid_clients import plaid_client

main_bp = Blueprint("main", __name__)


@main_bp.route("/create_link_token", methods=["POST"])
def create_link_token():
    data = request.get_json()
    user_id = data.get("user_id", "default_user")

    try:
        request_data = LinkTokenCreateRequest(
            user=LinkTokenCreateRequestUser(client_user_id=user_id),
            client_name="Your App Name",
            products=["auth", "transactions"],
            country_codes=["US"],
            language="en",
        )
        response = plaid_client.link_token_create(request_data)
        return jsonify(response.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@main_bp.route("/", methods=["GET"])
def index():
    return "Welcome to the Plaid API flask Platform App!"

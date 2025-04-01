from flask import Blueprint, request, jsonify
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from app.plaid_clients import plaid_client


plaid_bp = Blueprint("plaid", __name__)


@plaid_bp.route("/create_link_token", methods=["POST"])
def create_link_token():
    data = request.get_json()
    user_id = data.get("user_id", "default_user")

    try:
        request_data = LinkTokenCreateRequest(
            user=LinkTokenCreateRequestUser(client_user_id=user_id),
            client_name="Plaid Platform App",
            products=["auth", "transactions"],
            country_codes=["US"],
            language="en",
        )
        response = plaid_client.link_token_create(request_data)
        return jsonify(response.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

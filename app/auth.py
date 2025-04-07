from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

# from yourapp.models import User
# from yourapp.extensions import db

auth_bp = Blueprint(
    "auth",
    __name__,
)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    if not email or not username or not password:
        return jsonify({"error": "Missing required fields"}), 400

    # Check if the user already exists
    if User.query.filter((User.email == email) | (User.username == username)).first():
        return jsonify({"error": "User already exists"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        # Here you might generate a token or set session data
        return jsonify({"message": "Login successful", "user": user.username}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

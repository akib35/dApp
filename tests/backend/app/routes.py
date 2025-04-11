from flask import Blueprint, jsonify, request
from app.models import Database, Transaction
from app.utils import validate_transaction_data
from config import Config

bp = Blueprint("api", __name__, url_prefix="/api")
db = Database(Config.DATA_FILE)


@bp.route("/transactions", methods=["GET"])
def get_transactions():
    transactions = db.get_all_transactions()
    return jsonify(transactions)


@bp.route("/transactions/<int:transaction_id>", methods=["GET"])
def get_transaction(transaction_id):
    transaction = db.get_transaction(transaction_id)
    if transaction is None:
        return jsonify({"error": "Transaction not found"}), 404
    return jsonify(transaction)


@bp.route("/transactions", methods=["POST"])
def create_transaction():
    data = request.get_json()

    is_valid, message = validate_transaction_data(data)
    if not is_valid:
        return jsonify({"error": message}), 400

    try:
        transaction = Transaction(
            from_address=data["from"], to_address=data["to"], value=data["value"]
        )
        new_transaction = db.add_transaction(transaction)
        return jsonify(new_transaction), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route("/wallet/connect", methods=["POST"])
def connect_wallet():
    # Simulate wallet connection
    return jsonify({"address": "0x" + "a1b2c3d4e5f6", "balance": "3.1415 ETH"})

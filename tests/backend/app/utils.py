from datetime import datetime


def get_timestamp() -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M")


def validate_transaction_data(data: dict) -> tuple:
    required_fields = ["from", "to", "value"]
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return False, f"Missing fields: {', '.join(missing_fields)}"

    if (
        not isinstance(data["value"], (int, float))
        and not data["value"].replace(".", "").isdigit()
    ):
        return False, "Value must be a number"

    return True, "Valid data"

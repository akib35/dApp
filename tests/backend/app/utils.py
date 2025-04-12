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


import unittest
from app.utils import get_timestamp, validate_transaction_data


class TestUtils(unittest.TestCase):
    def test_get_timestamp(self):
        timestamp = get_timestamp()
        self.assertIsInstance(timestamp, str)
        self.assertRegex(timestamp, r"\d{4}-\d{2}-\d{2} \d{2}:\d{2}")

    def test_validate_transaction_data(self):
        valid_data = {"from": "0x123", "to": "0x456", "value": "10"}
        is_valid, message = validate_transaction_data(valid_data)
        self.assertTrue(is_valid)
        self.assertEqual(message, "Valid data")

        invalid_data = {"from": "0x123", "value": "10"}
        is_valid, message = validate_transaction_data(invalid_data)
        self.assertFalse(is_valid)
        self.assertIn("Missing fields", message)


if __name__ == "__main__":
    unittest.main()

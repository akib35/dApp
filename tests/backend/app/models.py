from datetime import datetime
import json
from pathlib import Path
from uuid import uuid4
from typing import List, Dict, Optional
from app.utils import get_timestamp


class Transaction:
    def __init__(self, from_address: str, to_address: str, value: str):
        self.id = str(uuid4().int)[:8]
        self.hash = f"0x{uuid4().hex[:10]}..."
        self.from_address = from_address
        self.to_address = to_address
        self.value = f"{value} ETH" if not value.endswith("ETH") else value
        self.timestamp = get_timestamp()
        self.status = "pending"

    def to_dict(self) -> Dict:
        return {
            "id": int(self.id),
            "hash": self.hash,
            "from": self.from_address,
            "to": self.to_address,
            "value": self.value,
            "timestamp": self.timestamp,
            "status": self.status,
        }


class Database:
    def __init__(self, data_file: Path):
        self.data_file = data_file
        self._ensure_data_file()

    def _ensure_data_file(self):
        if not self.data_file.exists():
            self.data_file.parent.mkdir(exist_ok=True)
            with open(self.data_file, "w") as f:
                json.dump([], f)

    def _read_data(self) -> List[Dict]:
        with open(self.data_file, "r") as f:
            return json.load(f)

    def _write_data(self, data: List[Dict]):
        with open(self.data_file, "w") as f:
            json.dump(data, f, indent=2)

    def get_all_transactions(self) -> List[Dict]:
        return self._read_data()

    def get_transaction(self, transaction_id: int) -> Optional[Dict]:
        transactions = self._read_data()
        return next((tx for tx in transactions if tx["id"] == transaction_id), None)

    def add_transaction(self, transaction: Transaction) -> Dict:
        transactions = self._read_data()
        tx_data = transaction.to_dict()
        transactions.append(tx_data)
        self._write_data(transactions)
        return tx_data


import unittest
from app.models import Transaction, Database
from pathlib import Path
import json


class TestModels(unittest.TestCase):
    def setUp(self):
        self.temp_file = Path("temp_transactions.json")
        self.db = Database(self.temp_file)

    def tearDown(self):
        if self.temp_file.exists():
            self.temp_file.unlink()

    def test_transaction_creation(self):
        tx = Transaction("0x123", "0x456", "10")
        self.assertEqual(tx.from_address, "0x123")
        self.assertEqual(tx.to_address, "0x456")
        self.assertEqual(tx.value, "10 ETH")
        self.assertEqual(tx.status, "pending")

    def test_database_operations(self):
        tx = Transaction("0x123", "0x456", "10")
        self.db.add_transaction(tx)
        transactions = self.db.get_all_transactions()
        self.assertEqual(len(transactions), 1)
        self.assertEqual(transactions[0]["from"], "0x123")


if __name__ == "__main__":
    unittest.main()

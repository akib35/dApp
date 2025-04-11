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

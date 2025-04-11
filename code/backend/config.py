import os
from pathlib import Path

BASE_DIR = Path(__file__).parent


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-key-123")
    DATA_FILE = BASE_DIR / "app" / "data" / "transactions.json"

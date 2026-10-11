import os
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent / ".env"

print("Looking for:", env_path)
print("File exists:", env_path.exists())

load_dotenv(env_path)

key = os.getenv("GEMINI_API_KEY")

print("Key loaded:", key is not None)
print("Key length:", len(key) if key else 0)
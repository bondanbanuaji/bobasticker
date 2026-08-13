import os
import requests

TARGET_URL = os.environ.get("TARGET_URL", "https://bobasticker.vercel.app")

def test_visitor_count_post_increments():
    before = requests.get(f"{TARGET_URL}/api/visitor-count", timeout=30).json()["count"]
    after = requests.post(f"{TARGET_URL}/api/visitor-count", timeout=30).json()["count"]
    assert after == before + 1, f"expected count {before + 1} after POST, got {after}"

test_visitor_count_post_increments()
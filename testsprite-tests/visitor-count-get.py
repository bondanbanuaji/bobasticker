import os
import requests

TARGET_URL = os.environ.get("TARGET_URL", "https://bobasticker.vercel.app")

def test_visitor_count_get_returns_count():
    r = requests.get(f"{TARGET_URL}/api/visitor-count", timeout=30)
    assert r.status_code == 200, f"expected 200, got {r.status_code}: {r.text}"
    data = r.json()
    assert "count" in data, f"response must have a count field: {data}"
    assert data["count"] >= 247, f"count should be >= 247 (base value), got {data['count']}"

test_visitor_count_get_returns_count()
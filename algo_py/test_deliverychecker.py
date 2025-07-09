import unittest
import subprocess
import sys
import json

class TestDeliveryChecker(unittest.TestCase):
    def run_checker(self, deliveries, path):
        cmd = [sys.executable, 'deliverychecker.py', json.dumps(deliveries), json.dumps(path)]
        result = subprocess.run(cmd, capture_output=True, text=True)
        return result.stdout.strip()

    def test_successful_delivery(self):
        deliveries = [["A", "B"], ["C", "D"]]
        path = ["A", "C", "B", "D"]
        output = self.run_checker(deliveries, path)
        self.assertIn('"status": "success"', output)

    def test_missing_address(self):
        deliveries = [["A", "B"], ["C", "D"]]
        path = ["A", "B", "D"]  # Missing C
        output = self.run_checker(deliveries, path)
        self.assertIn('"error_code": "delivery_address_not_in_path"', output)

    def test_dropoff_before_pickup(self):
        deliveries = [["A", "B"]]
        path = ["B", "A"]  # Dropoff before pickup
        output = self.run_checker(deliveries, path)
        self.assertIn('"error_code": "delivery_dropoff_before_pickup"', output)

    def test_non_delivery_address(self):
        deliveries = [["A", "B"]]
        path = ["A", "X", "B"]  # X is not a delivery address
        output = self.run_checker(deliveries, path)
        self.assertIn('"status": "success"', output)
        self.assertIn('"action": null', output)

    def test_invalid_input(self):
        cmd = [sys.executable, 'deliverychecker.py', 'notjson', 'alsonotjson']
        result = subprocess.run(cmd, capture_output=True, text=True)
        self.assertIn('"error_code": "invalid_input"', result.stdout)

if __name__ == "__main__":
    unittest.main()

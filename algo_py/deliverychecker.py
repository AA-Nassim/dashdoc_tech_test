import sys
import json

def main():
    # Reading input and checking if input is correct
    try:
        deliveries = json.loads(sys.argv[1])
        path = json.loads(sys.argv[2])
    except (IndexError, json.JSONDecodeError) as e:
        print(json.dumps({
            "status": "error",
            "error_code": "invalid_input",
            "error_message": "Invalid JSON input or missing arguments"
        }))
        return

    pickup_set = set()  # Used to keep track of pickup adresses
    dropoff_set = set() # Used to keep track of dropoff adresses
    pickup_to_dropoff = {}  # Used to easly access the dropoff adress with the pickup adress
    dropoff_to_pickup = {}  # Used to easly access the pickup adress with the dropoff adress

    for pickup, dropoff in deliveries:
        pickup_set.add(pickup)
        dropoff_set.add(dropoff)
        pickup_to_dropoff[pickup] = dropoff
        dropoff_to_pickup[dropoff] = pickup
    
    # Checking if there are any missing adresses in the path (using sets)
    path_set = set(path)
    missing_addresses = (pickup_set | dropoff_set) - path_set

    if missing_addresses:
        print(json.dumps({
            "status": "error",
            "error_code": "delivery_address_not_in_path",
            "error_message": f"The following delivery addresses are missing from the path: {sorted(missing_addresses)}"
        }))
        return

    picked_up = set()
    dropoffs = set()
    steps = []

    for addr in path:
        # Case 1 : addr is a pickup adress
        if addr in pickup_set:
            picked_up.add(addr)
            steps.append({"address": addr, "action": "pickup"})
            continue
        
        # Case 2 : addr is a dropoff adress
        if addr in dropoff_set:
            # Need to check if pick up happened
            # Case 2.1 : pick up not done
            pickup_addr = dropoff_to_pickup[addr]
            if pickup_addr not in picked_up:
                print(json.dumps({
                    "status": "error",
                    "error_code": "delivery_dropoff_before_pickup",
                    "error_message": f"Dropoff at address {addr} occurred before its pickup at address {pickup_addr}"
                }))
                return
            
            # Case 2.2 : pick up done
            dropoffs.add(addr)
            steps.append({"address": addr, "action": "dropoff"})
            continue 
        
        # Case 3 : addr is not a dropoff adress nor a pickup adress
        steps.append({"address": addr, "action": None})

    print(json.dumps({
        "status": "success",
        "steps": steps
    }, indent=2))

if __name__ == "__main__":
    main()
